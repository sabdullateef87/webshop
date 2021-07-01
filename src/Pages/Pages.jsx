import React, { useContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import {
  LandingPage,
  ErrorPage,
  Login,
  Register,
  Products,
  Cart,
  About,
  ProductDetails,
  Category,
  CreateProduct,
} from "./index";

import { GlobalContext } from "./../GlobalContext";
function Pages() {
  const [isLogged] = useContext(GlobalContext).user.logged;
  return (
    <Switch>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/login" exact>
        {isLogged ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/register" exact>
        {isLogged ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path="/cart" exact>
        <Cart />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/product" exact>
        <Products />
      </Route>
      <Route path="/category" exact>
        <Category />
      </Route>
      <Route path="/create_product" exact>
        <CreateProduct />
      </Route>
      <Route path="/edit_product/:id" exact>
        <CreateProduct />
      </Route>
      <Route path="/product/:id" exact>
        <ProductDetails />
      </Route>
      <Route path="*" exact>
        <ErrorPage />
      </Route>
    </Switch>
  );
}

export default Pages;
