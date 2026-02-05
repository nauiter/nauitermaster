import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.76.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  sessionId: string;
  language: "pt" | "en";
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId, language, userInfo } = await req.json() as RequestBody;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create Supabase client with service role for database operations
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Fetch knowledge base
    const { data: knowledge } = await supabase
      .from("lucy_knowledge")
      .select("*")
      .eq("is_active", true)
      .order("priority", { ascending: false });

    // Fetch mentorship tiers
    const { data: tiers } = await supabase
      .from("mentorship_tiers")
      .select("*")
      .eq("is_available", true)
      .order("display_order");

    // Build knowledge context
    const knowledgeContext = knowledge?.map(k => 
      language === "pt" 
        ? `Q: ${k.question_pt}\nA: ${k.answer_pt}`
        : `Q: ${k.question_en}\nA: ${k.answer_en}`
    ).join("\n\n") || "";

    const tiersContext = tiers?.map(t => 
      language === "pt"
        ? `- ${t.name_pt}: ${t.description_pt} (${t.price})`
        : `- ${t.name_en}: ${t.description_en} (${t.price})`
    ).join("\n") || "";

    const systemPrompt = language === "pt" 
      ? `Você é Lucy, Assistente Estratégica do Nauiter Master. Sua missão é:
1. Responder perguntas sobre o ecossistema e serviços de forma acolhedora e profissional
2. Qualificar interessados em mentorias (entender nível de experiência, orçamento, objetivos)
3. Quando o visitante estiver qualificado (demonstrou interesse real, compartilhou contexto), oferecer o link de agendamento
4. Manter tom profissional, acolhedor e estratégico

PROGRAMAS DE MENTORIA DISPONÍVEIS:
${tiersContext}

BASE DE CONHECIMENTO:
${knowledgeContext}

REGRAS:
- Nunca invente informações que não estejam na base de conhecimento
- Seja concisa mas informativa (respostas de 2-4 frases idealmente)
- Quando qualificar um lead, pergunte: nome, email, área de atuação e principal desafio
- O link de agendamento só deve ser fornecido após coleta de dados básicos
- Link de agendamento: https://calendly.com/nauiter-master
- Responda sempre em português brasileiro`
      : `You are Lucy, Strategic Assistant to Nauiter Master. Your mission is:
1. Answer questions about the ecosystem and services in a welcoming and professional manner
2. Qualify interested leads (understand experience level, budget, goals)
3. When the visitor is qualified (showed real interest, shared context), offer the scheduling link
4. Maintain a professional, welcoming and strategic tone

AVAILABLE MENTORSHIP PROGRAMS:
${tiersContext}

KNOWLEDGE BASE:
${knowledgeContext}

RULES:
- Never make up information not in the knowledge base
- Be concise but informative (2-4 sentence responses ideally)
- When qualifying a lead, ask for: name, email, field of work and main challenge
- The scheduling link should only be provided after collecting basic data
- Scheduling link: https://calendly.com/nauiter-master
- Always respond in English`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save conversation to database (async, don't wait)
    const allMessages = [...messages];
    supabase
      .from("lucy_conversations")
      .upsert({
        session_id: sessionId,
        messages: allMessages,
        user_info: userInfo || {},
        updated_at: new Date().toISOString(),
      }, { onConflict: "session_id" })
      .then(() => console.log("Conversation saved"));

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Lucy chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
