import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./DashBoard/Dashboard";
import PrimaryDashboard from "./mainDashboard/dashboard";
import myFlows from "./myFlows/myFlows";
import { DnDFlow2 } from "./DataBlocks/DnDFlow2";
import DataFlow from "./DataFlow/DataFlow";
import StepwiseFlow from "./StepwiseFlow/StepwiseFlow";
import Batches from "./Batches/Batches";
import Login from "./login";
import ImportDataset from "./Import Dataset/ImportDataset";
import QueryEdit from "./QueryEdit/QueryEdit";
import Dashboard2 from "./DashBoard/Dashboard2";
import TestDashboard from "./DashBoard/TestDashboard";
import OverView from "./DashBoard/OverView";
import EditDrillPath from "./DashBoard/EditDrillPath";

import Favorites from "./DashBoard/Favorites";
import DashboardOverview from "./DashBoard/DashboardOverview";
import ViewOnlyDashboards from "./DashBoard/ViewOnlyDashboards";
import { AuthContext } from "./context";
import MLDashboards from "./DashBoard/MLDashboards";
import FavoriteEditableDashboards from "./DashBoard/FavoriteEditableDashboards";
import ImportDataset2 from "./New Pages/ImportDataset2";
import TransformData from "./New Pages/TransformData";
import Files from "./New Pages/Files";
import ExistingDatasets from "./New Pages/ExistingDatasets";
import FavoriteWidgets2 from "./New Pages/FavouriteWidgets2";
import Databases from "./New Pages/Databases";
import ThirdParties from "./New Pages/ThirdParties";
import MyDataSources from "./New Pages/MyDataSources";
import MyFiles from "./New Pages/MyFiles";
import FavoriteDashboards2 from "./New Pages/FavoriteDashboards2";
import MyMLDashboards from "./New Pages/MyMLDashboards";
import Widgets2 from "./New Pages/Widgets2";
import Dashboards2 from "./New Pages/Dashboards2";
import MLDashboards2 from "./New Pages/MLDashboards2";
import CreateFlow from "./New Pages/CreateFlow";
import AutoMLEngine2 from "./New Pages/AutoMLEngine2";
import Overview2 from "./New Pages/Overview2";
import Data from "./New Pages/Data";
import Explore from "./New Pages/Explore";
import Clean from "./New Pages/Clean";
import MyProfile from "./New Pages/MyProfile";
import MyAccount from "./New Pages/MyAccount";
import ViewOnlyDashboards2 from "./DashBoard/ViewOnlyDashboards2";

function App() {
  const [token, setToken] = useState(null);
  const login = (token) => {
    setToken(token);
  };
  const logout = () => {
    setToken(null);
  };

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, login: login, logout: logout }}
      >
        <Router>
          {/* <Routes /> */}
          <div>
            <Switch>
              <Route exact path="/Dashboard/:id/:subscription_id">
                <PrimaryDashboard />
              </Route>

              <Route exact path="/login" component={Login} />
              <Route exact path="/dataDashboard/:id">
                <Dashboard />
              </Route>

              <Route exact path="/Data Blocks">
                <DnDFlow2 />
              </Route>
              <Route exact path="/Data Flows">
                <DataFlow />
              </Route>
              <Route exact path="/Big Data Flow/:subscription_id">
                <StepwiseFlow />
              </Route>
              <Route exact path="/My_Data_Flows">
                <Batches />
              </Route>
              <Route exact path="/Import Dataset/:subscription_id">
                <ImportDataset />
              </Route>
              <Route exact path="/Query_Editor">
                <QueryEdit />
              </Route>
              <Route exact path="/Widget Dashboard/:id/:subscription_id">
                <Dashboard2 />
              </Route>
              <Route exact path="/Main_Dashboard/:subscription_id">
                <TestDashboard />
              </Route>
              <Route exact path="/Widget Overview">
                <OverView />
              </Route>
              <Route exact path="/Dashboard Overview">
                <DashboardOverview />
              </Route>
              <Route exact path="/View_Only_Dashboards/:subscription_id">
                <ViewOnlyDashboards2 />
              </Route>
              <Route exact path="/Favourite Widgets">
                <Favorites />
              </Route>

              <Route exact path="/Edit_Drill_Path">
                <EditDrillPath />
              </Route>
              <Route exact path="/ML Dashboards">
                <MLDashboards />
              </Route>

              <Route exact path="/Favourite Dashboards">
                <FavoriteEditableDashboards />
              </Route>

              <Route exact path="/Import_Dataset2/:subscription_id">
                <ImportDataset2 />
              </Route>

              <Route exact path="/Transform_Data/:subscription_id">
                <TransformData />
              </Route>

              {/* <Route exact path='/Files'>
                <Files />
              </Route>
              <Route exact path='/Databases'>
                <Databases />
              </Route> */}
              <Route exact path="/Third_Parties">
                <ThirdParties />
              </Route>

              <Route exact path="/My_Datasources">
                <Databases />
              </Route>
              <Route exact path="/My_Files">
                <Files />
              </Route>

              <Route exact path="/Favorite_Widgets">
                <FavoriteWidgets2 />
              </Route>
              <Route exact path="/Favorite_Dashboards">
                <FavoriteDashboards2 />
              </Route>
              <Route exact path="/My_ML_Dashboards">
                <MyMLDashboards />
              </Route>

              <Route exact path="/Widgets">
                <Widgets2 />
              </Route>
              <Route exact path="/Dashboards">
                <Dashboards2 />
              </Route>
              <Route exact path="/ML_Dashboards">
                <MLDashboards2 />
              </Route>

              <Route exact path="/Overview">
                <Overview2 />
              </Route>

              <Route exact path="/Create_Flow">
                <CreateFlow />
              </Route>

              <Route exact path="/Auto_ML_Engine">
                <AutoMLEngine2 />
              </Route>
              <Route exact path="/Data">
                <Data />
              </Route>
              <Route exact path="/Explore">
                <Explore />
              </Route>
              <Route exact path="/Clean">
                <Clean />
              </Route>
              <Route exact path="/Profile">
                <MyProfile />
              </Route>
              <Route exact path="/My_Account">
                <MyAccount />
              </Route>

              <Route exact path="/Existing_Datasets">
                <ExistingDatasets />
              </Route>
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
