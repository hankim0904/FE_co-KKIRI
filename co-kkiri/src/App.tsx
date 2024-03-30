import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/globals";
import PageRouter from "./PageRouter";
import Toasts from "./components/commons/Widgets/Toast";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <ReactQueryDevtools initialIsOpen={false} />
        <PageRouter />
        <Toasts/>
      </QueryClientProvider>
    </>
  );
}

export default App;
