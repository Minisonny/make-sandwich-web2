import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { Route, Switch } from "react-router";
import socketIOClient from "socket.io-client";
import { Snackbar, Slide } from "@material-ui/core";
import Header from "./components/Header";
import Homepage from "./page/Homepage";
import Orders from "./page/Orders";
import SandwichControl from "./page/SandwichControl";
import UserControl from "./page/UserControl";
import { getAllSandwich } from "./services/sandwichServices";
import { getAllOrders } from "./services/orderServices";
import { getLatestAPIkey } from "./services/userServices";
import { useReferredState } from "./utils/hooks";
import { SERVER_URL } from "./services/constant";

const SlideTransitionUp = props => {
  return <Slide {...props} direction="up" />;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [sandwichData, setSandwichData] = useState([]);
  const [orderData, setOrderData] = useReferredState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const snackMessage = useRef("");

  useEffect(() => {
    getAllSandwich().then(data => {
      return setSandwichData(data);
    });
    getAllOrders().then(data => setOrderData(data));

    // This is for reloading page purpose. If user already logged in, keep them logged in.
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      getLatestAPIkey(loggedInUser.username)
        .then(apiKey => {
          setSnackBarWithMsg(`Logged in as ${loggedInUser.username}`);
          setUser({ ...loggedInUser, apiKey });
        })
        .catch(() => setUser(null));
    }

    // register socket.io protocol with server A
    const io = socketIOClient(SERVER_URL);
    io.on("statusChanged", updatedOrder => {
      setOrderData(
        orderData.current.map(order =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      setSnackBarWithMsg(
        `Status of order ${updatedOrder.id} changed to ${updatedOrder.status}`
      );
    });

    return () => io.disconnect();
  }, []);

  const setSnackBarWithMsg = msg => {
    snackMessage.current = msg;
    setSnackOpen(msg.length > 0);
  };

  const setUserAndSaveToLocalStorage = newUser => {
    if (!newUser) {
      setSnackBarWithMsg("Logged out successfully");
      localStorage.removeItem("loggedInUser");
    } else {
      setSnackBarWithMsg(`Logged in as ${newUser.username}`);
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    }

    setUser(newUser);
  };

  const addOrderWithSnackbar = newOrder => {
    setSnackBarWithMsg(`Order ${newOrder.id} added. Status: In Queue`);
    setOrderData([newOrder].concat(orderData.current));
  };

  return (
    <div className="App">
      <Header user={user} setUser={setUserAndSaveToLocalStorage} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Homepage
              sandwichData={sandwichData}
              addOrder={addOrderWithSnackbar}
            />
          )}
        />
        <Route
          exact
          path="/orders"
          render={() => (
            <Orders orderData={orderData.current} sandwichData={sandwichData} />
          )}
        />
        <Route
          exact
          path="/sandwiches"
          render={() => (
            <SandwichControl
              user={user}
              sandwichData={sandwichData}
              setSandwichData={setSandwichData}
            />
          )}
        />
        <Route
          exact
          path="/users"
          render={() => (
            <UserControl user={user} setUser={setUserAndSaveToLocalStorage} />
          )}
        />
      </Switch>
      <Snackbar
        autoHideDuration={3000}
        open={snackOpen}
        onClose={() => setSnackBarWithMsg("")}
        TransitionComponent={SlideTransitionUp}
        message={snackMessage.current}
        key={snackMessage.current}
      />
    </div>
  );
};

export default App;
