function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900">
            <span className="text-sm font-semibold text-zinc-200">
              D
            </span>
          </div>

          <div>
            <h1 className="text-sm font-semibold tracking-tight text-zinc-100 sm:text-base">
              AI DSA Visual Coach
            </h1>

            <p className="hidden text-xs text-zinc-600 sm:block">
              Learn algorithms visually
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />

          <span className="text-xs text-zinc-500">
            AI powered
          </span>
        </div>

      </div>
    </header>
  );
}

export default Header;