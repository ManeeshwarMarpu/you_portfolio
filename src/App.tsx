import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MobileBottomNav from "./components/MobileBottomNav";
import VectorHorizonIntro from "./components/LoadingScreen"; // Ensure this matches the export in LoadingScreen.tsx

// Pages
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Channel from "./pages/Channel";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Experiences from "./pages/Experiences";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Certifications from "./pages/Certifications";
import TicTacToe from "./pages/play/tictactoe";
import Snake from "./pages/play/snake";
import Memory from "./pages/play/Memory";
import SkillCard from "./pages/Skills";
import ScrollToTop from "./pages/ScrollToTop";

// AI Assistant
import AskPortfolioButton from "./components/ai/AskPortfolioButton";

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const introPlayingRef = useRef(false);

  // ✅ First visit only (Session Storage check)
  useEffect(() => {
    if (sessionStorage.getItem("introShown") !== "true") {
      introPlayingRef.current = true;
      setShowIntro(true);
    }
  }, []);

  // ✅ Logo-triggered intro (Global event listener)
  useEffect(() => {
    const handlePlayIntro = () => {
      if (introPlayingRef.current) return;
      introPlayingRef.current = true;
      setShowIntro(true);
    };

    window.addEventListener("play-intro", handlePlayIntro);
    return () => window.removeEventListener("play-intro", handlePlayIntro);
  }, []);

  const onIntroFinish = () => {
    sessionStorage.setItem("introShown", "true");
    introPlayingRef.current = false;
    setShowIntro(false);
  };

  return (
    <>
      {/* ✅ INTRO OVERLAY */}
      <AnimatePresence>
        {showIntro && (
          <VectorHorizonIntro 
            onFinish={onIntroFinish} 
            // Note: If your VectorHorizonIntro doesn't use 'brand' or 'subtitle' props, 
            // you don't need to pass them here.
          />
        )}
      </AnimatePresence>

      {/* ✅ APP LAYOUT - YouTube Style */}
      <div className="min-h-dvh bg-ytbg text-white flex flex-col relative overflow-x-hidden">
        <Header />

        <div className="flex grow w-full">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block md:w-64 lg:w-72 shrink-0 border-r border-white/5">
            <Sidebar />
          </aside>

          {/* Main Content Area */}
          <main className="min-w-0 grow px-3 sm:px-4 md:px-6 xl:px-8 py-4 pb-20">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<Watch />} />
              <Route path="/channel/:handle" element={<Channel />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/skills" element={<SkillCard />} />

              {/* 🎮 Play/Games Section */}
              <Route path="/play/tictactoe" element={<TicTacToe />} />
              <Route path="/play/snake" element={<Snake />} />
              <Route path="/play/memory" element={<Memory />} />

              {/* 404 Fallback */}
              <Route path="*" element={<div className="p-6 text-zinc-500">404 | Content not found</div>} />
            </Routes>
          </main>
        </div>

        {/* ✅ GLOBAL AI ASSISTANT (RAG Chatbot) */}
        <AskPortfolioButton />

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileBottomNav />
        </div>
      </div>
    </>
  );
}