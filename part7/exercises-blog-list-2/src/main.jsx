import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { NotificationContextProvider } from "./context/NotificationContext";
import { LoggedUserContextProvider } from "./context/LoggedUserContext";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <LoggedUserContextProvider>
        <App />
      </LoggedUserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
