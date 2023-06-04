import styled from "styled-components";
import React from "react";
import { Link } from 'react-router-dom';

const Header = styled.header`
	z-index: 10;
	width: 100%;
	height: 60px;
	display: flex;
	align-items: center;
	position: relative;
	position: fixed;
	top: 0;
	border-bottom: 1px solid #d6d6d6;
	background-color: white;
`;

const Logo = styled.div`
  position: absolute;
  left: 20%;
  font-weight: bolder;
  font-size: 18px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 30%;
  font-weight: bold;
`;

const Menu = styled.div`
  margin-right: 40px;
`;

const BtnBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	right: 15%;
	width: 150px;
`;

const LoginBtn = styled.button`
  width: 70px;
  height: 35px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const SignUpBtn = styled.button`
  width: 70px;
  height: 35px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

function Navbar() {
	return (
		<Header>
			<Logo><Link to="/">Polify</Link></Logo>
			<Nav>
				<Menu><Link to="/">Home</Link></Menu>
				<Menu><Link to="/">About</Link></Menu>
				<Menu><Link to="/QuerySurvey">All surveys</Link></Menu>
			</Nav>
			<BtnBox>
				<Link to="/SignIn"><LoginBtn>SignUp</LoginBtn></Link>
				<Link to="/SignUp"><SignUpBtn>SignIn</SignUpBtn></Link>
			</BtnBox>
		</Header>
	);
}

export default Navbar;
