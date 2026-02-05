import { useState, useCallback } from "react";
import { useLanguage } from "./useLanguage";
import { toast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface UserInfo {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
}

const generateSessionId = () => {
  return `lucy_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const useLucy = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/lucy-chat`;

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = { role: "user", content };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          sessionId,
          language,
          userInfo,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: language === "pt" ? "Limite atingido" : "Rate limited",
            description: language === "pt" 
              ? "Por favor, aguarde alguns segundos e tente novamente."
              : "Please wait a few seconds and try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        throw new Error("Failed to start stream");
      }

      // Check if lead was captured and show success message
      const leadCaptured = response.headers.get("X-Lead-Captured") === "true";
      if (leadCaptured) {
        toast({
          title: language === "pt" ? "Recebemos seu interesse!" : "We received your interest!",
          description: language === "pt" 
            ? "Em breve entraremos em contato." 
            : "We'll be in touch soon.",
        });
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const chunkContent = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (chunkContent) upsertAssistant(chunkContent);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const chunkContent = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (chunkContent) upsertAssistant(chunkContent);
          } catch { /* ignore */ }
        }
      }

    } catch (error) {
      console.error("Lucy chat error:", error);
      toast({
        title: language === "pt" ? "Erro" : "Error",
        description: language === "pt" 
          ? "Não foi possível enviar a mensagem. Tente novamente."
          : "Could not send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [messages, sessionId, language, userInfo, CHAT_URL]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const updateUserInfo = useCallback((info: Partial<UserInfo>) => {
    setUserInfo(prev => ({ ...prev, ...info }));
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    userInfo,
    updateUserInfo,
    sessionId,
  };
};
