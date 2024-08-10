import React from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NavBar() {

  const totalQuantity = useSelector((state) => state.allCart.totalQuantity);

  return (
    <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand>Navbar</MDBNavbarBrand>

        <Link to='/'>All Products</Link>

        <MDBBtn color='light'>
          <Link to="/cart">Cart ({totalQuantity})</Link>
        </MDBBtn>
    
      </MDBContainer>
    </MDBNavbar>
  );
}
