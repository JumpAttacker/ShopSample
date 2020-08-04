import useAuth from "../Hook/useAuth";
import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Callback} from "react-oidc";
import {clearUser, saveUser} from "../store/userData/Slice";
import ItemsPage from "../Page/ItemsPage";
import React from "react";
import MainNavBar from "./MainNavBar";
import ItemPage from "../Page/ItemPage";
import SilentRedirectPage from "./SilentRedirectPage";

const AppRouter = () => {
    const {userManager} = useAuth();
    const dispatch = useDispatch()
    return <Router>
        <MainNavBar/>
        <Switch>
            <Route
                path="/callback"
                render={routeProps => (
                    <Callback
                        onSuccess={(user: any) => {
                            const dispatchUser = {access_token: user.access_token, profile: user.profile}
                            dispatch(saveUser(dispatchUser));
                            routeProps.history.push('/')
                        }}
                        onError={err => {
                            dispatch(clearUser());
                            console.log('error', err)
                        }}
                        userManager={userManager}
                    />
                )}
            />
            <Route path="/callback-silent" component={SilentRedirectPage}/>
            <Route exact path="/items" component={ItemsPage}/>
            <Route path="/Items/:id" component={ItemPage}/>
        </Switch>
    </Router>
}
export default AppRouter