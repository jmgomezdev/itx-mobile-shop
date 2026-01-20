import { Link, useRouterState } from '@tanstack/react-router';

const getBreadcrumbs = (pathname: string) => {
  if (pathname.startsWith('/product/')) {
    return [{ label: 'Productos', to: '/' }, { label: 'Detalle' }];
  }

  return [{ label: 'Productos', to: '/' }];
};

export const AppBreadcrumbs = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
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
              <span className="font-medium text-slate-700">{crumb.label}</span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
