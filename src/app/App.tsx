import { AppProviders } from "./providers/AppProviders";
import { AppRouter } from "./router";
import "./App.css";

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
