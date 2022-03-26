import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import { AgendamentoProvider } from "./context/AgendamentoContext";
import { AuthProvider, useAuth } from "./context/Auth";
import { ItemsProvider } from "./context/ItemsContext";
import { NavBarProvider } from "./context/NavBarContext";
import HomeAgendamentos from "./pages/Agendamentos/HomeAgendamentos";
import CadastrosItems from "./pages/Cadastros/CadastroItem";
import HomeCadastros from "./pages/Cadastros/HomeCadastros";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/SignUp";

export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        //Renderiza a pagina somente se user existir
        //Caso contrário, redireciona para a página de login
        return user ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
}
const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signUp" component={SignUp} />
          <NavBarProvider>
            <Main>
              <PrivateRoute exact path="/home" component={Home} />
              <ItemsProvider>
                <PrivateRoute
                  exact
                  path="/cadastros"
                  component={HomeCadastros}
                />
                <PrivateRoute
                  exact
                  path="/cadastros-itens"
                  component={CadastrosItems}
                />
                <AgendamentoProvider>
                  <PrivateRoute
                    exact
                    path="/agendamento"
                    component={HomeAgendamentos}
                  />
                </AgendamentoProvider>
              </ItemsProvider>
            </Main>
          </NavBarProvider>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
