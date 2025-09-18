import { useState } from "react";
import { Mail, Github, Linkedin, Copy } from "lucide-react";

const EMAIL = "mmarpu@cougarnet.uh.edu";
const SUBJECT = encodeURIComponent("Hello from your portfolio");

export default function Contact() {
  const [toast, setToast] = useState<{open:boolean; msg:string}>({open:false, msg:""});

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast({open:true, msg:"Email copied"});
    } catch {
      setToast({open:true, msg:"Couldn’t copy — long-press to copy"});
    } finally {
      setTimeout(() => setToast({open:false, msg:""}), 1500);
    }
  }

  return (
    <section className="space-y-6 max-w-2xl mx-auto">
      <header>
        <h1 className="text-2xl font-bold text-yt">Let’s work together</h1>
        <p className="text-yt-muted mt-1">
          I’m open to Software Engineering and SRE roles, freelance projects, and collaborations.
        </p>
      </header>

      {/* Primary actions */}
      <div className="grid sm:grid-cols-[1fr_auto] gap-2">
        <a
          href={`mailto:${EMAIL}?subject=${SUBJECT}`}
          className="flex items-center justify-center gap-2 h-11 rounded-xl bg-card border border-yt shadow-yt hover:bg-ytbg-hover text-yt font-medium"
          aria-label="Email me"
        >
          <Mail className="w-5 h-5" />
          <span>Email me</span>
        </a>
        <button
          onClick={copyEmail}
          className="flex items-center justify-center gap-2 h-11 rounded-xl border border-yt hover:bg-ytbg-hover text-yt"
          aria-label="Copy email to clipboard"
        >
          <Copy className="w-5 h-5" />
          <span>Copy</span>
        </button>
      </div>

      {/* Social cards */}
      <div className="space-y-3">
        <a
          href="https://github.com/ManeeshwarMarpu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl bg-card border border-yt hover:shadow-yt hover:bg-ytbg-hover transition text-yt"
          aria-label="Open GitHub profile"
        >
          <Github className="w-5 h-5" />
          <div>
            <div className="font-medium">GitHub</div>
            <div className="text-sm text-yt-muted">Explore my code and projects</div>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/marpumaneeshwar/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl bg-card border border-yt hover:shadow-yt hover:bg-ytbg-hover transition text-yt"
          aria-label="Open LinkedIn profile"
        >
          <Linkedin className="w-5 h-5" />
          <div>
            <div className="font-medium">LinkedIn</div>
            <div className="text-sm text-yt-muted">Let’s connect and chat</div>
          </div>
        </a>
      </div>

      {/* Availability snippet (optional) */}
      <p className="text-xs text-yt-muted">
        Based in Houston, TX · Typically replies within 24–48 hours
      </p>

      {/* Toast */}
      <div
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-[120] pointer-events-none transition-all duration-300 ${
          toast.open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <div className="pointer-events-auto rounded-xl bg-card/95 border border-yt px-4 py-2 shadow-yt backdrop-blur text-yt">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span>{toast.msg}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
