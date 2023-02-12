import React, { useState } from 'react';
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import "./index.css"

const AppNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="text-bg-success ">
            <div className="container">
                <Navbar className="m-l-5" dark expand="md">
                    <NavbarBrand className ="btn btn-success" tag={Link} to={"/"} >Home</NavbarBrand>
                    <NavbarBrand tag={Link} to="/employees">Employee List</NavbarBrand>
                    <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="justify-content-end" style={{width: "100%"}} navbar>
                            <NavItem>
                                <NavbarBrand color="btn btn-success" tag={Link} to="/employee">Add</NavbarBrand>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default AppNavbar;