import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { CircleUserRound, QrCode, Sun, Moon } from "lucide-react";
// If this is in /public, prefer the Vite alias:
import LogoIcon from "/portfolio-icon.svg";

const LINKEDIN_URL = "https://www.linkedin.com/in/marpumaneeshwar/";

function useTheme() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Only auto-follow system if the user hasn't explicitly chosen a theme yet
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const saved = localStorage.getItem("theme");
      if (saved !== "light" && saved !== "dark") {
        setTheme(media.matches ? "dark" : "light");
      }
    };
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  return { theme, toggle: () => setTheme(t => (t === "dark" ? "light" : "dark")) };
}

export default function Header() {
  const nav = useNavigate();
  const { theme, toggle } = useTheme();
  const [qrOpen, setQrOpen] = React.useState(false);
  const qrRef = React.useRef<HTMLDivElement>(null);

  const handleSearch = (q: string) => {
    const term = q.trim();
    if (term) nav(`/home?q=${encodeURIComponent(term)}`);
    else nav("/home", { replace: true });
  };

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!qrRef.current?.contains(e.target as Node)) setQrOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    LINKEDIN_URL
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-yt shadow-yt">
      <div className="flex items-center justify-between px-3 md:px-5 py-2 gap-3">
        {/* Left: brand (menu removed) */}
        <Link to="/home" className="flex items-center gap-2 group">
          <img
            src={LogoIcon}
            alt="YouPortfolio logo"
            className="h-8 w-8 rounded-[6px]"
            loading="eager"
          />
          <span className="font-semibold text-xl tracking-tight text-yt whitespace-nowrap">
            You<span className="text-red-500">Portfolio</span>
          </span>
        </Link>

        {/* Center: search (desktop) */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <SearchBar onSubmit={handleSearch} />
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5">
          {/* LinkedIn QR */}
          <div className="relative" ref={qrRef}>
            <button
              title="LinkedIn QR"
              className="btn-icon"
              onClick={() => setQrOpen(o => !o)}
              aria-haspopup="dialog"
              aria-expanded={qrOpen}
              aria-controls="linkedin-qr-popover"
            >
              <QrCode className="size-5" />
            </button>
            {qrOpen && (
              <div
                id="linkedin-qr-popover"
                role="dialog"
                aria-label="LinkedIn QR code"
                className="absolute right-0 mt-2 w-[260px] rounded-xl border border-yt bg-card shadow-yt p-3"
              >
                <div className="text-xs font-medium mb-2 text-yt">Scan to open LinkedIn</div>
                <img
                  src={qrSrc}
                  className="w-[220px] h-[220px] rounded-md border border-yt bg-white"
                  alt="QR code linking to LinkedIn profile"
                />
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-yt hover:underline"
                >
                  Open LinkedIn profile
                </a>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="btn-icon"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>

          {/* Channel */}
          <Link to="/channel/maneesh" className="btn-icon" title="Your channel" aria-label="Your channel">
            <CircleUserRound className="size-6" />
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-3 pb-2 md:hidden">
        <SearchBar onSubmit={handleSearch} />
      </div>
    </header>
  );
}
