import { motion } from "framer-motion";

export function AnimatedBorder({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative group">
      {/* Animated gradient border */}
      <motion.div
        aria-hidden
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="
          absolute -inset-[1px] rounded-3xl
          bg-[linear-gradient(90deg,#60a5fa,#818cf8,#60a5fa)]
          opacity-70 blur-[2px]
          dark:opacity-50
        "
      />

      {/* Card content */}
      <div className="relative rounded-3xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
}
