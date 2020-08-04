import useAuth from "./useAuth";
import {clearUser} from "../store/userData/Slice";
import {useDispatch} from "react-redux";

const useRequest = () => {
    const {userManager, Login} = useAuth()
    const dispatch = useDispatch();
    const createAuthorizedRequest = async (method: string = 'GET', body: any = undefined) => {
        const user = await userManager.getUser();
        if (!user) {
            console.log('user in null')
            return;
        }
        const req = {
            method: method ? method : "GET",

            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.access_token,
            },

            body: body
        };
        return req;
    }

    const checkForResult = async (statusCode: number) => {
        if (statusCode === 401) {
            console.log('Unauthorized')
            // dispatch(clearUser());
            // await Login();
        } else {
            return true;
        }
    }

    const fetchData = async (url: string, method: string = 'GET', body: any = undefined) => {
        const requestArgs = await createAuthorizedRequest(method, body)
        const request = await fetch(url, requestArgs);
        if (await checkForResult(request.status))
            return await request.json();
        return undefined;
    };

    return {
        fetchData
    }
}

export default useRequest;