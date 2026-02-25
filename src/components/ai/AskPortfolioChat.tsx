

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

// Data Imports
import { projects } from "../../data/projects";
import { coreSkills } from "../../data/skills";
import { aboutData } from "../../data/about";

type Message = {
  role: "user" | "assistant";
  text: string;
  error?: boolean;
};

// ========================================
// RAG KNOWLEDGE BASE
// ========================================
class SimpleRAG {
  private documents: Array<{ id: string; content: string; metadata: any }> = [];

  constructor() {
    this.indexKnowledge();
  }

  private indexKnowledge() {
    projects.forEach((proj) => {
      this.documents.push({
        id: `project-${proj.id}`,
        content: `PROJECT: ${proj.title}. ${proj.description}. Tech Stack: ${proj.tags?.join(", ")}. Category: ${proj.category}`,
        metadata: { type: "project" },
      });
    });

    coreSkills.forEach((group, idx) => {
      const skillsList = group.skills
        .map((s: any) => `${s.name}: ${s.description}`)
        .join(" ");
      this.documents.push({
        id: `skill-${idx}`,
        content: `SKILLSET - ${group.title}: ${skillsList}`,
        metadata: { type: "skill" },
      });
    });

    aboutData.education.forEach((edu, idx) => {
      this.documents.push({
        id: `edu-${idx}`,
        content: `EDUCATION: I am pursuing a ${edu.degree} at ${edu.institution} (${edu.year}). Focus Areas: ${edu.details}`,
        metadata: { type: "education" },
      });
    });

    aboutData.certifications.forEach((cert) => {
      this.documents.push({
        id: `cert-${cert.id}`,
        content: `CERTIFICATION: I hold the ${cert.title} issued by ${cert.issuer} in ${cert.date}. Verified Link: ${cert.link}`,
        metadata: { type: "certification" },
      });
    });

    const auth = aboutData.workAuthorization;
    this.documents.push({
      id: "career-info",
      content: `CAREER STATUS: My visa status is ${auth.status}. Relocation: ${auth.relocation} Sponsorship: ${auth.sponsorship} Availability: ${auth.availability}`,
      metadata: { type: "career" },
    });

    this.documents.push({
      id: "bio-main",
      content: `PERSONAL BIO: I am ${aboutData.name}, a ${aboutData.title} based in ${aboutData.location}. ${aboutData.bio} Contact: ${aboutData.contact.email}`,
      metadata: { type: "about" },
    });
  }

  search(query: string, topK: number = 6) {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\W+/).filter((w) => w.length > 2);

    const scoredDocs = this.documents.map((doc) => {
      const docLower = doc.content.toLowerCase();
      let score = 0;
      if (docLower.includes(queryLower)) score += 15;
      queryWords.forEach((word) => {
        if (docLower.includes(word)) score += 3;
      });
      return { ...doc, score };
    });

    return scoredDocs
      .sort((a, b) => b.score - a.score)
      .filter((doc) => doc.score > 2)
      .slice(0, topK);
  }
}

const rag = new SimpleRAG();

// ========================================
// API CONFIG — set your production URL here
// ========================================
const PROD_API_URL = "https://fjcnaeonkj.execute-api.us-east-1.amazonaws.com/api/chat";

function getApiUrl() {
  return window.location.hostname === "localhost"
    ? "http://localhost:3001/api/chat"
    : PROD_API_URL;
}

// Safely extract text from multiple possible response shapes
function extractTextFromResponse(data: any): string | null {
  // Shape 1: { content: [{ text: "..." }] }  ← direct Anthropic passthrough
  if (Array.isArray(data?.content) && data.content[0]?.text) {
    return data.content[0].text;
  }
  // Shape 2: { reply: "..." }
  if (typeof data?.reply === "string") return data.reply;
  // Shape 3: { message: "..." }
  if (typeof data?.message === "string") return data.message;
  // Shape 4: { text: "..." }
  if (typeof data?.text === "string") return data.text;
  // Shape 5: { choices: [{ message: { content: "..." } }] }  ← OpenAI-style wrapper
  if (Array.isArray(data?.choices) && data.choices[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  return null;
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 2,
  delayMs = 800
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);
      if (res.ok) return res;
      // Don't retry 4xx errors (bad request, auth, etc.)
      if (res.status >= 400 && res.status < 500) return res;
    } catch (err: any) {
      if (attempt === retries) throw err;
    }
    await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)));
  }
  throw new Error("Max retries exceeded");
}

// ========================================
// COMPONENT
// ========================================
export default function AskPortfolioChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I'm Maneeshwar's AI assistant. Ask me about my Cloud/DevOps projects, my studies at UH, my certifications, or my work eligibility!",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const sendMessage = async (overrideText?: string) => {
    const userMessage = (overrideText ?? input).trim();
    if (!userMessage || isTyping) return;

    setInput("");
    setLastUserMessage(userMessage);

    // Don't re-add the user message if retrying (it's already in the list)
    if (!overrideText) {
      setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    } else {
      // Remove the last error message before retrying
      setMessages((prev) => prev.filter((m) => !m.error));
    }

    setIsTyping(true);

    try {
      const relevantDocs = rag.search(userMessage);
      const context = relevantDocs
        .map(
          (doc) =>
            `[SOURCE: ${doc.metadata.type.toUpperCase()}] ${doc.content}`
        )
        .join("\n\n");

      const systemPrompt = `You are Maneeshwar Marpu's AI Portfolio Assistant.
      
IDENTITY: Maneeshwar is a Cloud/DevOps & AI/ML Engineer and Master's student at the University of Houston.

CAREER FAQ:
- Relocation: I am 100% willing to relocate for the right opportunity within the U.S.
- Visa: I am an international student on an F1 visa (eligible for CPT/OPT).

CONTEXT FROM PORTFOLIO:
${context || "No specific matches found. Use general knowledge: Maneeshwar is an expert in React, Python, and Kubernetes."}

INSTRUCTIONS:
1. Speak in FIRST PERSON ("I developed", "I am studying", "I require").
2. Answer job application questions (visa, relocation, availability) accurately.
3. Keep answers professional and under 4 sentences.`;

      const apiUrl = getApiUrl();

      const response = await fetchWithRetry(
        apiUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ systemPrompt, userMessage }),
        },
        2 // retry up to 2 more times
      );

      if (!response.ok) {
        const errBody = await response.text().catch(() => "");
        console.error(`[PortfolioAI] API error ${response.status}:`, errBody);
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const aiText = extractTextFromResponse(data);

      if (!aiText) {
        console.error("[PortfolioAI] Unexpected response shape:", data);
        throw new Error("Could not parse response from server.");
      }

      setMessages((prev) => [...prev, { role: "assistant", text: aiText }]);
    } catch (err: any) {
      console.error("[PortfolioAI] Fatal error:", err);

      const isTimeout = err?.name === "AbortError";
      const errorText = isTimeout
        ? "The request timed out. My server may be cold-starting — please try again in a moment."
        : "Something went wrong on my end. Tap retry or ask again!";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: errorText, error: true },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRetry = () => {
    if (lastUserMessage) sendMessage(lastUserMessage);
  };

  const lastMessage = messages[messages.length - 1];
  const showRetry = lastMessage?.error && !isTyping;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-6 right-6 w-[92vw] md:w-[440px] h-[80vh] max-h-[640px] flex flex-col z-50 rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-950/90 backdrop-blur-2xl shadow-2xl"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-zinc-900/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-600 shadow-inner">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white">
              Portfolio AI
            </h3>
            <p className="text-[10px] text-zinc-400 flex items-center gap-1">
              <Sparkles size={10} className="text-red-600" /> Career & Education
              Ready
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:text-red-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* MESSAGES */}
      <div
        ref={scrollRef}
        className="flex-1 px-6 py-6 overflow-y-auto space-y-6 scrollbar-hide"
      >
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  m.role === "user"
                    ? "bg-red-600 shadow-lg"
                    : m.error
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "bg-red-600/10 text-red-600 border border-red-600/20"
                }`}
              >
                {m.role === "user" ? (
                  <User size={14} />
                ) : m.error ? (
                  <AlertCircle size={14} />
                ) : (
                  <Bot size={14} />
                )}
              </div>
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-red-600 text-white rounded-tr-none shadow-md"
                    : m.error
                    ? "bg-amber-500/5 text-amber-300 rounded-tl-none border border-amber-500/10 shadow-sm"
                    : "bg-white/5 text-zinc-200 rounded-tl-none border border-white/5 shadow-sm"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-600/10 text-red-600 border border-red-600/20">
              <Bot size={14} />
            </div>
            <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}

        {/* Retry button */}
        {showRetry && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-red-500 border border-white/10 hover:border-red-500/30 px-4 py-2 rounded-full transition-all"
            >
              <RefreshCw size={12} />
              Retry last message
            </button>
          </motion.div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-5 border-t border-white/5 bg-zinc-950/80 backdrop-blur-md flex-shrink-0">
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-3 rounded-2xl bg-zinc-900 text-white text-sm outline-none focus:ring-2 focus:ring-red-600/20 transition-all border border-white/5 placeholder:text-zinc-600"
            placeholder="Ask about anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && sendMessage()
            }
            disabled={isTyping}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isTyping || !input.trim()}
            className="p-4 rounded-2xl bg-white text-black hover:bg-red-600 hover:text-white transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}