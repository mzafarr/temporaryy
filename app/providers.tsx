"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";

import { store } from "./lib/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
