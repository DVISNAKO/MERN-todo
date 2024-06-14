import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import useRoutes from "./routes";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";


function App() {
  const {login, logout, token, userId, isReady} = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin);
  return (
    <div>
      <AuthContext.Provider value={{login, logout, isReady, token, userId}}>
        <BrowserRouter>
        <Header />
        {routes}
      </BrowserRouter>
      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
