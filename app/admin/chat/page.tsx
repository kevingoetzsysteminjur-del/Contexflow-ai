"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface Conversation {
  id: string;
  customer: { id: string; name: string; email: string };
  messages: { content: string; createdAt: string }[];
  lastMessageAt: string;
  _count: { messages: number };
}

export default function AdminChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/chat/conversations").then((r) => r.json()).then((d) => { setConversations(d.conversations ?? []); setLoading(false); });
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--text-primary)", marginBottom: "1.5rem" }}>Kundenchats</h1>

      {loading ? (
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Lade Chats...</p>
      ) : conversations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px dashed var(--border-color)", borderRadius: 8 }}>
          <MessageSquare size={40} style={{ color: "var(--text-tertiary)", margin: "0 auto 1rem" }} />
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Noch keine Chats vorhanden.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {conversations.map((conv, i) => {
            const lastMsg = conv.messages[0];
            const unread = conv._count.messages;
            return (
              <motion.div key={conv.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link
                  href={`/admin/chat/${conv.id}`}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "var(--bg-secondary)", border: "1px solid var(--border-color)", borderRadius: 8, textDecoration: "none", transition: "border-color 0.2s ease", flexWrap: "wrap", gap: "0.75rem" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#F59E0B50"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"; }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: 4 }}>
                      <p style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 400 }}>{conv.customer.name}</p>
                      {unread > 0 && (
                        <span style={{ fontSize: 10, padding: "1px 6px", background: "#f87171", color: "#fff", borderRadius: 10, fontWeight: 600 }}>{unread}</span>
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {lastMsg ? lastMsg.content.slice(0, 50) + (lastMsg.content.length > 50 ? "..." : "") : "Noch keine Nachrichten"}
                    </p>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
                    {lastMsg ? new Date(lastMsg.createdAt).toLocaleDateString("de-DE") : ""}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
