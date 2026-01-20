export const ProductDetailFallback = () => (
  <section className="space-y-6">
    <div className="h-4 w-36 rounded-full bg-slate-200" />

    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-52 w-52 rounded-2xl bg-slate-100" />
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <div className="h-3 w-24 rounded-full bg-slate-200" />
            <div className="h-5 w-56 rounded-full bg-slate-200" />
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="h-3 w-16 rounded-full bg-slate-200" />
              <div className="h-4 w-20 rounded-full bg-slate-200" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="h-3 w-14 rounded-full bg-slate-200" />
              <div className="h-4 w-32 rounded-full bg-slate-200" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="h-3 w-12 rounded-full bg-slate-200" />
              <div className="h-4 w-28 rounded-full bg-slate-200" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="h-3 w-28 rounded-full bg-slate-200" />
              <div className="h-4 w-36 rounded-full bg-slate-200" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="h-3 w-20 rounded-full bg-slate-200" />
              <div className="h-4 w-24 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <div className="h-3 w-20 rounded-full bg-slate-200" />
          </div>

          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              <div className="h-3 w-28 rounded-full bg-slate-200" />
              <div className="h-10 w-full rounded-lg bg-slate-100" />
            </div>

            <div className="space-y-2">
              <div className="h-3 w-20 rounded-full bg-slate-200" />
              <div className="h-10 w-full rounded-lg bg-slate-100" />
            </div>

            <div className="h-10 w-full rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  </section>
);
