import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { projects } from "../../data/projects";
import ProjectPreviewCard from "../ProjectPreviewCard";


type Message = {
  role: "user" | "assistant";
  text: string;
  entities?: {
    projects?: string[];
  };
};

export default function AskPortfolioChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I'm Maneeshwar. Ask me anything about my projects, experience, or skills.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // -----------------------------
  // Auto-scroll
  // -----------------------------
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // -----------------------------
  // Helpers
  // -----------------------------
  const getProjectsByTitle = (titles: string[]) =>
    projects.filter((p) => titles.includes(p.title));

  // -----------------------------
  // Send message
  // -----------------------------
  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
          entities: data.entities,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ AI backend is offline. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-24 right-6 w-[92vw] md:w-[460px] h-[640px] flex flex-col z-50 rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-950/90 backdrop-blur-2xl shadow-2xl"
    >
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white">
              Portfolio AI
            </h3>
            <p className="text-[10px] text-zinc-400 flex items-center gap-1">
              <Sparkles size={10} className="text-red-600" /> Live RAG
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:text-red-600">
          <X size={18} />
        </button>
      </div>

      {/* ================= CHAT ================= */}
      <div
        ref={scrollRef}
        className="flex-1 px-6 py-6 overflow-y-auto space-y-6"
      >
        <AnimatePresence>
          {messages.map((m, i) => (
            <div key={i} className="space-y-4">
              {/* MESSAGE BUBBLE */}
              <motion.div
                initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex gap-3 ${
                  m.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-600/10 text-red-600">
                  {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-red-600 text-white rounded-tr-none"
                      : "bg-white/5 text-zinc-200 rounded-tl-none"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>

              {/* ================= PROJECT PREVIEWS ================= */}
              {(() => {
                const projectTitles = m.entities?.projects;
                if (!projectTitles || projectTitles.length === 0) return null;

                const relatedProjects = getProjectsByTitle(projectTitles);
                if (relatedProjects.length === 0) return null;

                return (
                  <div className="grid gap-3 pl-10">
                    {relatedProjects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => navigate(`/projects/${p.id}`)}
                        className="cursor-pointer hover:scale-[1.02] transition"
                      >
                        <ProjectPreviewCard p={p} />

                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="text-[10px] text-zinc-400 animate-pulse">
            AI is thinking…
          </div>
        )}
      </div>

      {/* ================= INPUT ================= */}
      <div className="p-5 border-t border-white/5">
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-3 rounded-2xl bg-zinc-900 text-white text-sm outline-none"
            placeholder="Ask about React, Kubernetes, AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={isTyping}
            className="p-4 rounded-2xl bg-white text-black"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
