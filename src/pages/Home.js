import React from 'react';
import Navbar from '../Components/Navbar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginBtn = styled.button`
  width: 70px;
  height: 35px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const BtnBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	right: 15%;
	width: 150px;
`;

const Header = styled.div`
  background-color: #f2f2f2;
  height: 150px;
  border-bottom: 1px solid #d6d6d6;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderComment1 = styled.div`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Main = styled.div`
  width: 60%;
  position: relative;
  box-sizing: border-box;
`;

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Header>
        <HeaderComment1>Polify</HeaderComment1>
      </Header>
      <Body>
        <Main>
          <BtnBox>
				    <Link to="/createForm"><LoginBtn>CreateSurvey</LoginBtn></Link>
			    </BtnBox>
        </Main>
      </Body>
    </>
  );
};

export default Home;
