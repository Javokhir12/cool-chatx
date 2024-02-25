import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@/context/theme-provider';
import { Header } from '@/components/Header';
import { View } from '@/types/common';
import { ProfileDetails } from '@/components/ProfileDetails';
import { EditProfile } from '@/components/EditProfile';

const queryClient = new QueryClient();

function App() {
  const [view, setView] = useState(View.ProfileDetails);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Header />
        <main className="container mx-auto dark:text-white">
          {view === View.ProfileDetails ? (
            <ProfileDetails setView={setView} />
          ) : null}
          {view === View.EditProfile ? <EditProfile /> : null}
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
