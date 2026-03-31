"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Message { id: string; content: string; senderId: string; createdAt: string; }
interface Conversation { id: string; admin: { id: string; name: string }; messages: Message[]; }

export default function DashboardChatPage() {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function load() {
    const r = await fetch("/api/chat/conversations");
    const d = await r.json();
    const convs = d.conversations ?? [];
    if (convs.length > 0) {
      const detailRes = await fetch(`/api/chat/conversations/${convs[0].id}`);
      const detail = await detailRes.json();
      setConversation(detail.conversation ?? null);
    } else {
      setConversation(null);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages.length]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;
    setSending(true);

    if (!conversation) {
      // First message — creates conversation
      await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input.trim() }),
      });
    } else {
      await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: conversation.id, content: input.trim() }),
      });
    }

    setInput("");
    setSending(false);
    load();
  }

  const myId = user?.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 100px)", maxWidth: 700 }}
    >
      <div style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-color)" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 300, color: "var(--text-primary)" }}>Chat mit Contexflow Support</h1>
        <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Wir antworten so schnell wie möglich.</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.75rem", paddingBottom: "1rem" }}>
        {loading ? (
          <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>Lade Nachrichten...</p>
        ) : !conversation ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
            <MessageCircle size={40} style={{ color: "var(--text-tertiary)", marginBottom: "1rem" }} />
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Noch keine Nachrichten.</p>
            <p style={{ color: "var(--text-tertiary)", fontSize: 12, marginTop: "0.5rem" }}>Schreib eine Nachricht, um den Chat zu starten.</p>
          </div>
        ) : (
          conversation.messages.map((msg) => {
            const isMe = msg.senderId === myId;
            return (
              <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "70%",
                  padding: "0.6rem 0.9rem",
                  borderRadius: isMe ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                  background: isMe ? "#6366F1" : "var(--bg-secondary)",
                  border: isMe ? "none" : "1px solid var(--border-color)",
                }}>
                  <p style={{ fontSize: 13, color: isMe ? "#fff" : "var(--text-primary)", lineHeight: 1.5 }}>{msg.content}</p>
                  <p style={{ fontSize: 10, color: isMe ? "rgba(255,255,255,0.6)" : "var(--text-tertiary)", marginTop: 4, textAlign: isMe ? "right" : "left" }}>
                    {new Date(msg.createdAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nachricht schreiben..."
          style={{ flex: 1, padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, color: "var(--text-primary)", fontSize: 13, outline: "none" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#6366F1"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; }}
        />
        <button type="submit" disabled={sending || !input.trim()} style={{ padding: "0.75rem", background: "#6366F1", border: "none", borderRadius: 8, cursor: sending ? "not-allowed" : "pointer", color: "#fff", display: "flex", alignItems: "center", opacity: sending ? 0.6 : 1 }}>
          <Send size={16} />
        </button>
      </form>
    </motion.div>
  );
}
