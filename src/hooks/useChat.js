import { useState, useCallback } from "react";

const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/chat`
  : "/chat";
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null); 

      const userMsg = { id: Date.now(), role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      // Build full history to send to the API
      const history = [...messages, userMsg].map(({ role, content }) => ({
        role,
        content,
      }));

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.detail || `Server error ${res.status}`);
        }

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "assistant",
            content: data.reply,
            usage: {
              input: data.input_tokens,
              output: data.output_tokens,
            },
          },
        ]);
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, loading, error, sendMessage, clearChat };
}