import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

function NavBar(){
    return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/Home">Academic Portal IITT</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/Home">Home</Nav.Link>
                <Nav.Link href="/Issues">Issues</Nav.Link>
                <Nav.Link href="/Studymaterial">Study Material</Nav.Link>
                </Nav>
                <Nav>
                    <Form>
                        <Button variant="outline-primary" className="mr-sm-2">SignUp</Button>
                        <Button variant="outline-primary">Login</Button>
                    </Form>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
    );
}

export default NavBar;