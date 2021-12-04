import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react";

import 'styles/style.css';

import Login from 'pages/Login'
import Registro from "pages/Registro";
import Index from "pages/Index";
import PrivateLayout from "layouts/PrivateLayout";
import AuthLayout from "layouts/AuthLayout";
import Articulos from "pages/admin/Articulos";
import Administradores from "pages/admin/Administradores";
import Participantes from "pages/Participantes";
import Productos from "pages/Productos";
import AccountSetting from "pages/AccountSetting";
import PublicLayout from "layouts/PublicLayout";
import DetallesProducto from "pages/DetallesProducto";
import Carrito from "pages/Carrito";
import DetallesAdministrador from "pages/DetallesAdministrador";
import Ventas from "pages/admin/Ventas";
import CategoriaPublic from "pages/CategoriaPublic";
import CategoriasCRUD from "pages/admin/CategoriasCRUD";

function App() {
  return (
    <Auth0Provider
      domain="multipan.us.auth0.com"
      clientId="APBIiDJRblQLBKonJVBMpdKbes2RLiGT"
      redirectUri={window.location.origin}
      audience="https://multipan.us.auth0.com/api/v2/"
    >
      <Router>
        <Switch>
          <Route path={['/registro', '/login']}>
            <AuthLayout>
              <Switch>
                <Route path="/registro">
                  <Registro />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>

              </Switch>

            </AuthLayout>
          </Route>

          <Route path={['/articulos', '/categorias-crud', '/administradores',  '/administrador/:id', '/ventas']}>
            <PrivateLayout>
              <Switch>


                <Route path="/articulos">
                  <Articulos />
                </Route>
                <Route path="/categorias-crud">
                  <CategoriasCRUD />
                </Route>
                <Route path="/administradores">
                  <Administradores />
                </Route>

                <Route path="/administrador/:id">
                  <DetallesAdministrador />
                </Route>

                <Route path="/ventas">
                  <Ventas />
                </Route>

              </Switch>
            </PrivateLayout>
          </Route>

          <Route path={['/', '/categorias','/productos/:name', '/participantes', '/account-setting', '/producto/:id', 'carrito']}>
            <PublicLayout>
              <Switch>
                <Route path="/account-setting">
                  <AccountSetting />
                </Route>
                <Route path="/categorias">
                  <CategoriaPublic />
                </Route>
                <Route path="/productos/:name">
                  <Productos />
                </Route>
                <Route path="/producto/:id">
                  <DetallesProducto />
                </Route>
                <Route path="/carrito">
                  <Carrito />
                </Route>
                <Route path="/participantes">
                  <Participantes />
                </Route>
                <Route path="/">
                  <Index />
                </Route>
              </Switch>
            </PublicLayout>
          </Route>


        </Switch>
      </Router>
    </Auth0Provider>
  );
}

export default App;
