import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { I18nProvider } from "./i18n/I18nProvider.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <I18nProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </I18nProvider>
);
