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
              border: "1px solid rgba(19, 34, 56, 0.08)",
              background: "rgba(255, 255, 255, 0.92)",
              color: "#132238",
              boxShadow: "0 24px 50px rgba(19, 34, 56, 0.12)",
            },
            success: {
              iconTheme: {
                primary: "#0f9d8a",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#d64545",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </SocketContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
