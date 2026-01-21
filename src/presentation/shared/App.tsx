import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { RouterProvider } from '@tanstack/react-router';

import { queryClient } from '@/core/query/queryClient';
import { router } from '@/interface/router';
import '@/presentation/shared/assets/style.css';

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: 'itx-mobile-shop',
});

const App = () => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister, maxAge: 1000 * 60 * 60 }}
  >
    <RouterProvider router={router} />
  </PersistQueryClientProvider>
);

export default App;
