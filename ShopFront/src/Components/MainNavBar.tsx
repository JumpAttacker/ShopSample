import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import AuthPanel from "./AuthPanel";
import {Link} from "react-router-dom";

const MainNavBar = () => {
    return <Navbar bg="dark" variant="dark" sticky="top">
        <Nav.Link as={Link} to="/">Shop</Nav.Link>
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Items">Items</Nav.Link>
        </Nav>
        <AuthPanel/>
    </Navbar>;
}
export default MainNavBar