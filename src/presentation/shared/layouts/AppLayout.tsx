import { Outlet } from '@tanstack/react-router';

import { AppBreadcrumbs } from '@/presentation/shared/components/AppBreadcrumbs';
import { CartSummary } from '@/presentation/shared/components/CartSummary';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <AppBreadcrumbs />
          <CartSummary />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
