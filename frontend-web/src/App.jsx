import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import ToastProvider from "./contexts/ToastProvider";
import { UserProvider, UserContext } from "./contexts/UserContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";

function AppRoutes() {
  return useRoutes([UserRoutes, AdminRoutes, AuthRoutes]);
}

function App() {
  return (
    <Router>
      <UserProvider>
        <UserContext.Consumer>
          {({ user }) => (
            <WebSocketProvider userId={user?.id}>
              <ToastProvider>
                <AppRoutes />
              </ToastProvider>
            </WebSocketProvider>
          )}
        </UserContext.Consumer>
      </UserProvider>
    </Router>
  );
}

export default App;
