import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import { BookScreen } from "./pages/BookScreen";
import { HomeScreen } from "./pages/HomeScreen";
import { BookmarkScreen } from "./pages/BookmarkScreen";

const AuthenticatedApp = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/discover" component={HomeScreen} />
        <Route exact path="/bookmark" component={BookmarkScreen} />
        <Route path="/book/:id" component={BookScreen} />
      </Switch>
    </Layout>
  );
};

export default AuthenticatedApp;
