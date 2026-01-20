import { Link } from '@tanstack/react-router';

interface RouterErrorBoundaryProps {
  error: unknown;
}

export const RouterErrorBoundary = ({ error }: RouterErrorBoundaryProps) => {
  const message = error instanceof Error ? error.message : 'Error inesperado';

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center gap-4 text-center">
      <p className="text-xs tracking-wide text-slate-400 uppercase">
        Ha ocurrido un error
      </p>
      <h1 className="text-2xl font-semibold text-slate-900">{message}</h1>
      <p className="text-sm text-slate-500">
        Intenta recargar la página o vuelve al listado de productos.
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Recargar
        </button>
        <Link
          to="/"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};
