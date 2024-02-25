import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@/context/theme-provider';
import { Header } from '@/components/Header';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Header />
        <main className="container mx-auto dark:text-white">Main</main>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
