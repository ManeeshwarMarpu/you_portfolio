// src/components/LoadingScreen.tsx
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] animate-fadeOut">
      <div className="animate-pulse text-white text-3xl font-bold tracking-widest">
        MANEESHWAR
      </div>
    </div>
  );
}
