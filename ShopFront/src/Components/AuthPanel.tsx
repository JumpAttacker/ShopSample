import useAuth from "../Hook/useAuth";
import React, {useEffect} from "react";
import {Button, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {saveUser} from "../store/userData/Slice";

interface IUserData {
    name: string
}

const AuthPanel = () => {
    const {GetUser, Login, Logout, userManager} = useAuth();
    const dispatch = useDispatch();
    const userName: string = useSelector((state: any) => {
        const userData = state.userData;
        if (userData)
            return userData.profile?.name;
        return ''
    });

    useEffect(() => {
        const getUserData = async () => {
            const user = await GetUser();
            if (user) {
                const dispatchUser = {access_token: user.access_token, profile: user.profile}
                dispatch(saveUser(dispatchUser));
            }
        }
        getUserData();
    }, [])

    return <>
        {userName ? <Nav>
                <Navbar.Text>
                    Signed in as: <a href="">{userName}</a>
                </Navbar.Text>
                <Button onClick={Logout} className='ml-2' variant="outline-light">Logout</Button>
            </Nav> :
            <Nav>
                <Button onClick={Login} variant="outline-light">Login</Button>
                <Button className='ml-2' disabled variant="outline-light">Register</Button>
            </Nav>}
    </>
}
export default AuthPanel