import { NavLink } from "react-router-dom";
import {
  Home, LayoutGrid, Briefcase, Award, Info, Mail,
  Github, Linkedin, Joystick, Grid3X3, Brain, Turtle
} from "lucide-react";

const link =
  "flex items-center md:justify-start justify-center md:gap-3 gap-0 px-3 py-2 rounded-lg hover:bg-ytbg-hover text-yt";
const active = "bg-ytbg-hover border border-yt font-medium";

export default function Sidebar() {
  return (
    // Sidebar only for desktop (md+)
    <aside className="hidden md:flex sticky top-[56px] h-[calc(100dvh-56px)] w-64 lg:w-72 shrink-0 border-r border-yt bg-card flex-col">

      <nav className="flex-1 p-3 space-y-4 flex flex-col">

        {/* Primary Navigation */}
        <div className="space-y-1">
          <NavLink to="/home" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
            <Home className="size-5" /> <span className="hidden md:inline">Home</span>
          </NavLink>

          <NavLink to="/projects" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
            <LayoutGrid className="size-5" /> <span className="hidden md:inline">Projects</span>
          </NavLink>

          <NavLink to="/experiences" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
            <Briefcase className="size-5" /> <span className="hidden md:inline">Experiences</span>
          </NavLink>

          <NavLink to="/certifications" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
            <Award className="size-5" /> <span className="hidden md:inline">Certifications</span>
          </NavLink>
          <NavLink
            to="/skills"
            className={({ isActive }) => `${link} ${isActive ? active : ""}`}
          >
            <Brain className="size-5" />
            <span className="hidden md:inline">Skills</span>
          </NavLink>


          <NavLink to="/about" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
            <Info className="size-5" /> <span className="hidden md:inline">About</span>
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
            <Mail className="size-5" /> <span className="hidden md:inline">Contact</span>
          </NavLink>
        </div>

        {/* Social */}
        <div className="pt-4 border-t border-yt">
          <div className="px-3 text-xs uppercase tracking-wide text-yt-muted">Social</div>
          <div className="mt-2 space-y-1">
            <a className={link} href="https://github.com/ManeeshwarMarpu" target="_blank" rel="noreferrer">
              <Github className="size-5" /> <span className="hidden md:inline">GitHub</span>
            </a>
            <a className={link} href="https://www.linkedin.com/in/marpumaneeshwar/" target="_blank" rel="noreferrer">
              <Linkedin className="size-5" /> <span className="hidden md:inline">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Play Section */}
        <div className="mt-auto pt-4 border-t border-yt">
          <div className="px-3 text-xs uppercase tracking-wide text-yt-muted flex items-center gap-2">
            <Joystick className="w-4 h-4" /> Play
          </div>

          <div className="mt-2 space-y-1">
            <NavLink to="/play/tictactoe" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
              <Grid3X3 className="size-5" /> <span className="hidden md:inline">Tic-Tac-Toe</span>
            </NavLink>

            <NavLink to="/play/snake" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
              <Turtle className="size-5" /> <span className="hidden md:inline">Snake</span>
            </NavLink>

            <NavLink to="/play/memory" className={({ isActive }) => `${link} ${isActive ? active : ""}`}>
              <Brain className="size-5" /> <span className="hidden md:inline">Memory Match</span>
            </NavLink>
          </div>
        </div>

      </nav>
    </aside>
  );
}
