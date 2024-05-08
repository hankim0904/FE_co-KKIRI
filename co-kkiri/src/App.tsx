import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/globals";
import PageRouter from "./PageRouter";
import Toasts from "./components/commons/Widgets/Toast";
import { GlobalStackSvgSprite } from "./components/commons/GlobalStackSvgSprite";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <ReactQueryDevtools initialIsOpen={false} />
        <PageRouter />
        <GlobalStackSvgSprite />
        <Toasts />
      </QueryClientProvider>
    </>
  );
}

export default App;
