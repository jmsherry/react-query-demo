import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";

function Header() {
  return (
    <HeaderStyles className='page-header'>
      <h1>CarsApp</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add-car">Add Car</NavLink>
      </nav>
    </HeaderStyles>
  )
}

const HeaderStyles = styled.header`
  background-color: hsl(0, 0%, 0%);
  color: hsl(0, 0%, 100%);
  padding: 1em;
  margin-block-end: 2em;

  a {
    color: inherit;
    display: inline-flex;
    padding: 0.5em 1em;
    text-decoration: none;
  }
`

export default Header