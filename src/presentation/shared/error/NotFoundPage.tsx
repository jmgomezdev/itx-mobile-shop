import { Link } from '@tanstack/react-router';

export const NotFoundPage = () => (
  <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center gap-4 text-center">
    <p className="text-xs tracking-wide text-slate-400 uppercase">404</p>
    <h1 className="text-2xl font-semibold text-slate-900">
      Página no encontrada
    </h1>
    <p className="text-sm text-slate-500">
      La ruta no existe. Puedes volver al listado de productos.
    </p>
    <Link
      to="/"
      className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
    >
      Ir al inicio
    </Link>
  </div>
);
