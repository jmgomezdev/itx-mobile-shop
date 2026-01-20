import { Link, Outlet, useRouterState } from '@tanstack/react-router';

import { useCartStore } from '@/application/cart/store/cart.store';

const getBreadcrumbs = (pathname: string) => {
  if (pathname.startsWith('/product/')) {
    return [{ label: 'Productos', to: '/' }, { label: 'Detalle' }];
  }

  return [{ label: 'Productos', to: '/' }];
};

export const AppLayout = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const breadcrumbs = getBreadcrumbs(pathname);
  const cartCount = useCartStore((state) => state.count);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-lg font-semibold tracking-tight text-slate-900"
            >
              ITX Mobile Shop
            </Link>
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.label} className="flex items-center gap-2">
                  {index > 0 && <span className="text-slate-300">/</span>}
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-slate-700">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-slate-700">
                      {crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Carrito</span>
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-slate-900 px-2 text-xs font-semibold text-white">
              {cartCount}
            </span>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
