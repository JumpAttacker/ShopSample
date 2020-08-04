import React, {useEffect} from "react";
import useAuth from "../Hook/useAuth";

const SilentRedirectPage = () => {
    const auth = useAuth();
    useEffect(() => {
        console.log('silent signin')
        auth.userManager.signinSilentCallback();
    }, [])
    return <h3>silent redirect...</h3>
};

export default SilentRedirectPage;