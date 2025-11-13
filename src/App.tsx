import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
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
import MobileBottomNav from "./components/MobileBottomNav";   // <-- ADD THIS


export default function App() {
  return (
    <div className="min-h-dvh bg-ytbg text-white flex flex-col">
      
      {/* Header stays full-width */}
      <Header />

      {/* Main content layout */}
      <div className="flex grow w-full">

        {/* Sidebar: desktop only */}
        <aside className="hidden md:block md:w-64 lg:w-72 shrink-0">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="min-w-0 grow px-3 sm:px-4 md:px-6 xl:px-8 py-4 pb-20">
          {/* pb-20 prevents content from being hidden behind bottom nav */}
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
            <Route path="*" element={<div className="p-6">Not found</div>} />
          </Routes>
        </main>
      </div>

      {/* Mobile bottom navigation: visible only on small screens */}
      <div className="md:hidden">
        <MobileBottomNav />
      </div>

    </div>
  );
}
