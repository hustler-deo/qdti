import React from "react";
import { Route, Switch } from "react-router";
// import MiniDrawer from "../MiniDrawer";

import { RoutePaths } from "./PageRoutesConstant";

const Routes = () => {
    return (
        <Switch>
            <Route exact path={RoutePaths.login} />
        </Switch>
    )
}

export default Routes;