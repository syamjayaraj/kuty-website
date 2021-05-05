import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Page from "./components/Page";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => <Home />} />
        </Switch>
        <Switch>
          <Route path="/:url" exact render={(props) => <Page {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
