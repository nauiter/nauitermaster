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

// Helper function to extract name from conversation
function extractNameFromMessages(messages: ChatMessage[]): string | null {
  const namePatterns = [
    /(?:me chamo|meu nome é|sou o|sou a|i'm|my name is|i am)\s+([A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)?)/i,
    /^([A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)?)$/i, // Simple name response
  ];
  
  for (const msg of messages) {
    if (msg.role === "user") {
      for (const pattern of namePatterns) {
        const match = msg.content.match(pattern);
        if (match && match[1] && match[1].length > 2 && match[1].length < 50) {
          return match[1].trim();
        }
      }
    }
  }
  return null;
}

// Helper function to extract email from messages
function extractEmailFromMessages(messages: ChatMessage[]): string | null {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  for (const msg of messages) {
    if (msg.role === "user") {
      const match = msg.content.match(emailRegex);
      if (match) return match[0].toLowerCase();
    }
  }
  return null;
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

    // Extract email and name from conversation to auto-save leads
    const extractedEmail = extractEmailFromMessages(messages);
    const extractedName = extractNameFromMessages(messages) || userInfo?.name || "Lead via Lucy";
    
  // If email found, save/update lead automatically
    let leadCaptured = false;
    
    if (extractedEmail) {
      const leadData = {
        email: extractedEmail,
        name: extractedName,
        phone: userInfo?.phone || null,
        company: userInfo?.company || null,
        conversation: messages,
        status: "new",
        qualification_score: 1,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from("mentorship_leads")
        .upsert(leadData, { onConflict: "email" });
      
      if (error) {
        console.error("Error saving lead:", error);
      } else {
        leadCaptured = true;
        console.log("Lead saved/updated:", extractedEmail);
      }
    }

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
        ? `- ${t.name_pt}: ${t.description_pt} (${t.price_pt})`
        : `- ${t.name_en}: ${t.description_en} (${t.price_en})`
    ).join("\n") || "";

    const systemPrompt = language === "pt" 
      ? `Você é Lucy, Assistente Estratégica do Nauiter Master. Sua missão é:
1. Responder perguntas de forma BREVE e direta (máximo 2-3 frases)
2. Qualificar interessados coletando: nome, email e principal desafio
3. Quando tiver os dados, informar que a equipe entrará em contato em breve

PROGRAMAS DE MENTORIA:
${tiersContext}

BASE DE CONHECIMENTO:
${knowledgeContext}

REGRAS CRÍTICAS:
- Seja EXTREMAMENTE concisa - usuários não leem textos longos
- Use frases curtas e objetivas (máximo 2-3 frases por resposta)
- NÃO faça listas longas
- Quando qualificar, pergunte UMA informação por vez
- Após coletar email, agradeça e diga que entraremos em contato
- Nunca invente informações
- Responda sempre em português brasileiro`
      : `You are Lucy, Strategic Assistant to Nauiter Master. Your mission is:
1. Answer questions BRIEFLY and directly (max 2-3 sentences)
2. Qualify interested leads by collecting: name, email, and main challenge
3. When you have the data, inform that the team will get in touch soon

MENTORSHIP PROGRAMS:
${tiersContext}

KNOWLEDGE BASE:
${knowledgeContext}

CRITICAL RULES:
- Be EXTREMELY concise - users don't read long texts
- Use short, direct sentences (max 2-3 sentences per response)
- Do NOT make long lists
- When qualifying, ask ONE piece of information at a time
- After collecting email, thank them and say we'll be in touch
- Never make up information
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
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "X-Lead-Captured": leadCaptured ? "true" : "false",
      },
    });
  } catch (e) {
    console.error("Lucy chat error:", e);
    return new Response(JSON.stringify({ 
      error: "An error occurred processing your message. Please try again." 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
