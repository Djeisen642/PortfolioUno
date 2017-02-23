import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

var routes = [
  {label: 'Home', route: '/home'},
  {label: 'Blog', route: '/blog'},
  {label: 'Projects', route: '/projects'},
  {label: 'Resumé', route: '/resume'},
  {label: 'Contact', route: '/contact'}
];

var navItems = routes.map((routeData, index) => {
  return (
    <LinkContainer to={routeData.route} key={index+1}>
      <NavItem className="puNavItem">
        {routeData.label}
      </NavItem>
    </LinkContainer>
  );
});

const Header = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <h1 href="#" className="logo">PortfolioUno</h1>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        {navItems}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
