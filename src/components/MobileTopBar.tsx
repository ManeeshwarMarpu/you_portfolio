export default function MobileTopBar() {
  return (
    <div className="flex md:hidden items-center justify-between px-4 py-3 border-b">
      <button>
        <img src="/hamburger.svg" className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-bold">YouPortfolio</h1>
      <button>
        <img src="/search.svg" className="w-6 h-6" />
      </button>
    </div>
  );
}
