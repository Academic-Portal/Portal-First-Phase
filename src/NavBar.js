import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

function NavBar() {
    return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/Home">Academic Portal IITT</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/Home">Home</Nav.Link>
                    <Nav.Link href="/Issues">Issues</Nav.Link>
                    <Nav.Link href="/StudyMaterial">study material</Nav.Link>
                </Nav>
        </Navbar>
    </div>
    );
}

export default NavBar;
