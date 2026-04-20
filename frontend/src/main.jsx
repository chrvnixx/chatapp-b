import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { SocketContextProvider } from "./context/socketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SocketContextProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3200,
            style: {
              borderRadius: "18px",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              background: "rgba(255, 255, 255, 0.98)",
              color: "#0f172a",
              boxShadow: "0 24px 50px rgba(15, 23, 42, 0.12)",
            },
            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </SocketContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
