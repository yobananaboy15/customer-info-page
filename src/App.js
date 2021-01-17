import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { CustomerDetailPage } from "./pages/CustomerDetailPage";
import { CustomerListPage } from "./pages/CustomerListPage";
import { UserStatusContext } from "./contexts/UserStatusContext";
import Container from "react-bootstrap/Container";

function App() {
  const [userStatus, setUserStatus] = useState(null);
  const [customerList, setCustomerList] = useState(null);
  return (
    <Container>
      <UserStatusContext.Provider
        value={{ userStatus, setUserStatus, customerList, setCustomerList }}
      >
        <Switch>
          <Route path="/customers/:id" component={CustomerDetailPage} />
          <Route path="/customers">
            <CustomerListPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </UserStatusContext.Provider>
    </Container>
  );
}

export default App;
