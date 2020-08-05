import {makeUserManager} from "react-oidc";
import Oidc from "oidc-client";
import {useSelector} from "react-redux";
import Constants from "../Constants";

const config = {
    authority: Constants.stsAuthority,
    client_id: Constants.clientId,
    redirect_uri: `${Constants.clientRoot}callback`,
    silent_redirect_uri: `${Constants.clientRoot}callback-silent`,
    post_logout_redirect_uri: `${Constants.clientRoot}`,
    response_type: 'code',
    scope: Constants.clientScope,
    automaticSilentRenew: true,
    validateSubOnSilentRenew: true,
};

Oidc.Log.logger = console; // log;
Oidc.Log.level = Oidc.Log.DEBUG;

const useAuth = () => {
    const userManager = makeUserManager(config)
    const authed: boolean = useSelector((state: any) => {
        const userData = state.userData;
        if (userData)
            return userData.profile?.name ? true : false;
        return false
    });
    const GetUser = async () => {
        const user = await userManager.getUser();
        return user;
    }
    const IsAuth = () => {
        return authed
    }
    const Login = async () => {
        await userManager.signinRedirect()
    }
    const Logout = async () => {
        await userManager.signoutRedirect();
    }
    return {
        userManager,
        GetUser,
        IsAuth,
        Login,
        Logout
    }
}

export default useAuth;