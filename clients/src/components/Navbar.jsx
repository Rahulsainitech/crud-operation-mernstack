import React from "react";
import { Navbar,Nav,Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar_1 = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark" fixed="top" >
        <Container>
          <Nav className="me-auto">
            <NavLink to="/"  className="btn  btn-warning  mx-2">ADD DATA</NavLink>
            <NavLink to="/GET" className="btn btn-warning  ">Show All data</NavLink>
            {/* <NavLink to="/">Pricing</NavLink> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbar_1;
