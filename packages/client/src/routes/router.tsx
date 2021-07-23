import React, { FC, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../components/layout";
import Loading from "../components/ui/loading";

import { RouteItem, routes } from "./routes";

export const extractRoute = (all: RouteItem[], route: RouteItem) => {
  if (route.component) {
    all.push(route);
  } else if (route.children) {
    route.children.reduce(extractRoute, all);
  }
  return all;
};

const AppRoutes: FC = () => {
  const allRoutes = routes.reduce<RouteItem[]>(extractRoute, []);
  const fullscreenRoutes = allRoutes.filter(({ fullscreen }) => fullscreen);

  return (
    <Switch>
      <Layout>
        <Suspense fallback={<Loading />}>
          {allRoutes.map((item) => (
            <Route
              key={item.name}
              component={item.component}
              path={item.path}
              exact={item.exact}
            />
          ))}
        </Suspense>
      </Layout>
    </Switch>
  );
};

export default AppRoutes;
