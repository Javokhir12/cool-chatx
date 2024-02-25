import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  <QueryClientProvider client={queryClient}>
    <main>CoolChatX</main>;
  </QueryClientProvider>;
}

export default App;
