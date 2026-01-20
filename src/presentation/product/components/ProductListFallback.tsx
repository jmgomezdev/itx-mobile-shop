export const ProductListFallback = () => (
  <section className="space-y-6">
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="h-3 w-28 rounded-full bg-slate-200" />
        <div className="h-5 w-52 rounded-full bg-slate-200" />
      </div>
      <div className="h-10 w-full max-w-sm rounded-lg bg-slate-100" />
    </div>

    <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white">
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
        </span>
        <p className="text-sm">Cargando productos...</p>
      </div>
    </div>
  </section>
);
