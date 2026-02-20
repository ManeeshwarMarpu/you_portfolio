import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Sparkles } from "lucide-react";

// Data Imports
import { projects } from "../../data/projects";
import { coreSkills } from "../../data/skills";
import { aboutData } from "../../data/about";

type Message = {
  role: "user" | "assistant";
  text: string;
};

// ========================================
// REFINED RAG KNOWLEDGE BASE
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
        content: `PROJECT: ${proj.title}. ${proj.description}. Tech Stack: ${proj.tags?.join(', ')}. Category: ${proj.category}`,
        metadata: { type: 'project' }
      });
    });

    coreSkills.forEach((group, idx) => {
      const skillsList = group.skills.map((s: any) => `${s.name}: ${s.description}`).join(' ');
      this.documents.push({
        id: `skill-${idx}`,
        content: `SKILLSET - ${group.title}: ${skillsList}`,
        metadata: { type: 'skill' }
      });
    });

    aboutData.education.forEach((edu, idx) => {
      this.documents.push({
        id: `edu-${idx}`,
        content: `EDUCATION: I am pursuing a ${edu.degree} at ${edu.institution} (${edu.year}). Focus Areas: ${edu.details}`,
        metadata: { type: 'education' }
      });
    });

    aboutData.certifications.forEach((cert) => {
      this.documents.push({
        id: `cert-${cert.id}`,
        content: `CERTIFICATION: I hold the ${cert.title} issued by ${cert.issuer} in ${cert.date}. Verified Link: ${cert.link}`,
        metadata: { type: 'certification' }
      });
    });

    const auth = aboutData.workAuthorization;
    this.documents.push({
      id: 'career-info',
      content: `CAREER STATUS: My visa status is ${auth.status}. Relocation: ${auth.relocation} Sponsorship: ${auth.sponsorship} Availability: ${auth.availability}`,
      metadata: { type: 'career' }
    });

    this.documents.push({
      id: 'bio-main',
      content: `PERSONAL BIO: I am ${aboutData.name}, a ${aboutData.title} based in ${aboutData.location}. ${aboutData.bio} Contact: ${aboutData.contact.email}`,
      metadata: { type: 'about' }
    });
  }

  search(query: string, topK: number = 6) {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\W+/).filter(w => w.length > 2);
    
    const scoredDocs = this.documents.map(doc => {
      const docLower = doc.content.toLowerCase();
      let score = 0;
      if (docLower.includes(queryLower)) score += 15;
      queryWords.forEach(word => {
        if (docLower.includes(word)) score += 3;
      });
      return { ...doc, score };
    });

    return scoredDocs
      .sort((a, b) => b.score - a.score)
      .filter(doc => doc.score > 2)
      .slice(0, topK);
  }
}

const rag = new SimpleRAG();

export default function AskPortfolioChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I'm Maneeshwar's AI assistant. Ask me about my Cloud/DevOps projects, my studies at UH, my certifications, or my work eligibility!",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsTyping(true);

    try {
      const relevantDocs = rag.search(userMessage);
      const context = relevantDocs
        .map(doc => `[SOURCE: ${doc.metadata.type.toUpperCase()}] ${doc.content}`)
        .join('\n\n');

      const systemPrompt = `You are Maneeshwar Marpu's AI Portfolio Assistant. 
      
IDENTITY: Maneeshwar is a Cloud/DevOps & AI/ML Engineer. He is a Master's student at the University of Houston.

CAREER FAQ:
- Relocation: I am 100% willing to relocate for the right opportunity within the U.S.
- Visa: I am an international student on an F1 visa (eligible for CPT/OPT).

CONTEXT FROM PORTFOLIO:
${context || "No specific matches found. Use general knowledge: Maneeshwar is an expert in React, Python, and Kubernetes."}

INSTRUCTIONS:
1. Speak in FIRST PERSON ("I developed", "I am studying", "I require").
2. Answer job application questions (visa, relocation, availability) accurately.
3. Keep answers professional and under 4 sentences.

USER QUESTION: ${userMessage}`;

      const API_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:3001/api/chat' 
        : 'https://fjcnaeonkj.execute-api.us-east-1.amazonaws.com/api/chat';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt, userMessage }),
      });

      if (!response.ok) throw new Error(`API request failed: ${response.status}`);

      const data = await response.json();
      const aiResponse = data.content[0].text;

      setMessages(prev => [...prev, { role: "assistant", text: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        text: "I'm having trouble connecting right now. Please try again later!" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      /* FIXED CSS CLASSES BELOW */
      className="fixed bottom-6 right-6 w-[92vw] md:w-[440px] h-[80vh] max-h-[640px] flex flex-col z-50 rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-950/90 backdrop-blur-2xl shadow-2xl"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-zinc-900/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-600 shadow-inner">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white">Portfolio AI</h3>
            <p className="text-[10px] text-zinc-400 flex items-center gap-1">
               <Sparkles size={10} className="text-red-600" /> Career & Education Ready
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:text-red-600 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* MESSAGES */}
      <div ref={scrollRef} className="flex-1 px-6 py-6 overflow-y-auto space-y-6 scrollbar-hide">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${m.role === "user" ? "bg-red-600 shadow-lg" : "bg-red-600/10 text-red-600 border border-red-600/20"}`}>
                {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-red-600 text-white rounded-tr-none shadow-md" : "bg-white/5 text-zinc-200 rounded-tl-none border border-white/5 shadow-sm"}`}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-600/10 text-red-600 border border-red-600/20"><Bot size={14} /></div>
            <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 shadow-sm">
              <div className="flex gap-1.5"><span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" /><span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]" /><span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]" /></div>
            </div>
          </div>
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
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
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