import { Flex, Spinner } from "@chakra-ui/react";
import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import BasicStatistics from "./BasicStatistics";
import DataTable from "./DataTable";
import Login from "./Login";
import SidebarWithHeader from "./SidebarWithHeader";
import { useCookies } from "react-cookie";
import Test from "./Test";

const Router = () => {
  const [cookies] = useCookies();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useHistory();

  const sessionAuthenticate = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const obj = queryParams.get("obj");
    const data = JSON.parse(obj);

    if (data && data.session_id && cookies.PHPSESSID === data.session_id) {
      navigate.push(`/dashboard/${obj}`);
    } else {
      navigate.push("/login");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // sessionAuthenticate();
  }, []);

  if (isLoading) {
    return (
      <Flex
        width="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    );
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path="/" component={Test} />
        {/* <Route path="/login" component={Login} exact />
        <Route path="/dashboard/:obj">
          <SidebarWithHeader>
            <BasicStatistics />
            <DataTable />
          </SidebarWithHeader>
        </Route>
        <Route path="/stat/:obj">
          <SidebarWithHeader>
            <DataTable />
          </SidebarWithHeader>
        </Route> */}
      </Switch>
    </Suspense>
  );
};

export default withRouter(Router);
