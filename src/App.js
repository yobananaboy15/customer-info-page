import React from "react";
import { Route, Switch } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { CustomerDetailPage } from "./pages/CustomerDetailPage";
import { CustomerListPage } from "./pages/CustomerListPage";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/customers">
          <CustomerListPage />
        </Route>
        <Route path="/customers/:id">
          <CustomerDetailPage />
        </Route>
        <Route path="/">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
