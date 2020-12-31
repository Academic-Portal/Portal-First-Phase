import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

function NavBarHome(){
    return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/Home">Academic Portal IITT</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/Home">Home</Nav.Link>
                    <Nav.Link href="/Issues">Issues</Nav.Link>
                    <Nav.Link href="/StudyMaterial">study material</Nav.Link>
                </Nav>
                <Nav>
                    <Form inline>
                        <Button variant="outline-light" className = "mr-sm-2">SignUp</Button>
                        <Button variant="outline-light">Login</Button>
                    </Form>
                </Nav>

        </Navbar>
    </div>
    );
}

export default NavBarHome;