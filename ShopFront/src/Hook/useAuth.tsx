import {makeUserManager} from "react-oidc";
import Oidc from "oidc-client";

const Constants = {
    stsAuthority: 'http://localhost:5000/',
    clientId: 'interactive.public',
    clientRoot: 'http://localhost:3000/',
    clientScope: 'openid profile email api',
    apiRoot: 'http://localhost:5000/api/',
    //
    // stsAuthority: 'https://demo.identityserver.io/',
    // clientId: 'interactive.public',
    // clientRoot: 'http://localhost:4200/',
    // clientScope: 'openid profile email api',
    // apiRoot: 'https://demo.identityserver.io/api/'
}

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
    const GetUser = async () => {
        const user = await userManager.getUser();
        return user;
    }
    const IsAuth = async () => {
        const user = await userManager.getUser();
        return !!user;
    }
    const Login = async () => {
        await userManager.signinRedirect()
    }
    const Logout = async () => {
        await userManager.signoutRedirect()
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