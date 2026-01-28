import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MobileBottomNav from "./components/MobileBottomNav";
import YouTubeIntro from "./components/YouTubeIntro";

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
import Skills from "./pages/Skills";
import ScrollToTop from "./pages/ScrollToTop";


export default function App() {
  // Play intro only once per browser
  const [showIntro, setShowIntro] = useState(() => {
    return localStorage.getItem("introShown") !== "true";
  });

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        localStorage.setItem("introShown", "true");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <>
      {/* INTRO OVERLAY */}
      {showIntro && <YouTubeIntro />}

      {/* MAIN APP UI */}
      <div className="min-h-dvh bg-ytbg text-white flex flex-col relative overflow-x-hidden">

        <Header />

        <div className="flex grow w-full">
          <aside className="hidden md:block md:w-64 lg:w-72 shrink-0">
            <Sidebar />
          </aside>

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
              <Route path="/play/tictactoe" element={<TicTacToe />} />
              <Route path="/play/snake" element={<Snake />} />
              <Route path="/play/memory" element={<Memory />} />
              <Route path="/skills" element={<Skills />} />

              <Route path="*" element={<div className="p-6">Not found</div>} />
            </Routes>
          </main>
        </div>

        <div className="md:hidden">
          <MobileBottomNav />
        </div>
      </div>
    </>
  );
}
