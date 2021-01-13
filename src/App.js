import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { CustomerDetailPage } from "./pages/CustomerDetailPage";
import { CustomerListPage } from "./pages/CustomerListPage";
import { UserStatusContext } from "./contexts/UserStatusContext";
import { UserStatus } from "./components/UserStatus";

//regex för att validera ny kund /SE\d{10}$/.test()

function App() {
  const [userStatus, setUserStatus] = useState(null);
  const [customerList, setCustomerList] = useState(null);
  return (
    <div>
      <UserStatusContext.Provider
        value={{ userStatus, setUserStatus, customerList, setCustomerList }}
      >
        <UserStatus />
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
    </div>
  );
}

export default App;
