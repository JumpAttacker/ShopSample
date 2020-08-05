import React, {useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import {IUserData} from "../store/userData/Slice";
import {useSelector} from "react-redux";

export interface IPrivateRouteProps {
    children: any,
    exact?: boolean,
    path: string,
    authed: boolean
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children,authed, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authed ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute