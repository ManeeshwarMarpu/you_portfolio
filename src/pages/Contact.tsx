import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Copy, ExternalLink, Sparkles, Send } from "lucide-react";
import type { Variants } from "framer-motion";
const EMAIL = "mmarpu@cougarnet.uh.edu";
const SUBJECT = encodeURIComponent("Hello from your portfolio");

export default function Contact() {
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({ open: false, msg: "" });

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast({ open: true, msg: "Copied to clipboard!" });
    } catch {
      setToast({ open: true, msg: "Couldn’t copy — long-press to copy" });
    } finally {
      setTimeout(() => setToast({ open: false, msg: "" }), 2500);
    }
  }


const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };


  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative space-y-10 max-w-4xl mx-auto py-16 px-6 overflow-hidden"
    >
      {/* THEME-AWARE BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 dark:bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <motion.header variants={itemVariants} className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-[0.2em]">
          <Sparkles className="w-3.5 h-3.5" /> Open for Opportunities
        </div>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-100">
          Let’s start a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
            Conversation.
          </span>
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl mx-auto font-medium">
          Based in Houston, TX. I specialize in Cloud Engineering and SRE.
        </p>
      </motion.header>

      {/* EMAIL CARD */}
      <motion.div variants={itemVariants} className="relative max-w-2xl mx-auto">
        <div className="absolute -inset-2 bg-gradient-to-r from-red-200/40 to-emerald-200/40 dark:from-red-500/10 dark:to-emerald-500/10 blur-xl opacity-60" />

        <div className="relative flex flex-col sm:flex-row gap-3 p-3 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-700 rounded-3xl shadow-xl">
          <a
            href={`mailto:${EMAIL}?subject=${SUBJECT}`}
            className="group flex items-center gap-4 px-6 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all flex-1"
          >
            <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Email Me</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-100 truncate">{EMAIL}</span>
            </div>
          </a>

          <button
            onClick={copyEmail}
            className="flex items-center justify-center gap-2 px-10 h-16 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold transition-all active:scale-95"
          >
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
      </motion.div>

      {/* SOCIAL GRID */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {[
          { name: "GitHub", icon: <Github />, link: "https://github.com/ManeeshwarMarpu" },
          { name: "LinkedIn", icon: <Linkedin />, link: "https://www.linkedin.com/in/marpumaneeshwar/" }
        ].map((p) => (
          <motion.a
            key={p.name}
            variants={itemVariants}
            href={p.link}
            target="_blank"
            whileHover={{ y: -6 }}
            className="flex items-center gap-5 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm"
          >
            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              {p.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-zinc-900 dark:text-zinc-100">{p.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {toast.open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold shadow-xl flex items-center gap-4"
          >
            <div className="p-1 rounded-md bg-emerald-500">
              <Send className="w-3.5 h-3.5 text-white" />
            </div>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
