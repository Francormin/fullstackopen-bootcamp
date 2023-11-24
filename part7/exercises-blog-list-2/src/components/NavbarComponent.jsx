import { Nav, Navbar } from "react-bootstrap";
import Logout from "./Logout";

const NavbarComponent = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="light" data-bs-theme="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="/" className="navLink">
            Home
          </Nav.Link>
          <Nav.Link href="/users" className="navLink">
            Users
          </Nav.Link>
          <Nav.Link href="/blogs" className="navLink">
            Blogs
          </Nav.Link>
          <Navbar.Text>
            logged-in <Logout />
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
