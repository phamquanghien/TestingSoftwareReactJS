import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// const Menu = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/student">Student</Link>
//         </li>
//         <li>
//           <Link to="/faculty">Faculty</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };
const Menu = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/student">
            <Nav.Link>Student</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/faculty">
            <Nav.Link>Faculty</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
