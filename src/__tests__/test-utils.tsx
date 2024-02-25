/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@/context/theme-provider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
        cacheTime: 0,
      },
    },
  });

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export function createQueryClientWrapper({
  queryClient = new QueryClient(),
}: {
  queryClient?: QueryClient;
}) {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return wrapper;
}

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: options?.wrapper ?? AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
