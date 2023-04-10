import React from "react";
import { createRoot } from "react-dom/client";
import App from "~/components/App/App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { theme } from "~/theme";
// import { Buffer } from "buffer";
import axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: Infinity },
  },
});

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({ onUnhandledRequest: "bypass" });
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response.status;

    switch (status) {
      case 401:
      case 403: {
        alert(error.response.data?.message);
        return;
      }
      case 400: {
        alert(error.response.data?.data);
        return;
      }
      default: {
        console.error(error.response);
      }
    }

    return Promise.reject(error.response);
  }
);

// const credentials = { login: "lisinchyk1", password: "TEST_PASSWORD" };
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// const encodedCreds = Buffer.from(
//   `${credentials.login}:${credentials.password}`
// ).toString("base64");

// localStorage.setItem("authorization_token", encodedCreds);

const container = document.getElementById("app");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
