import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import Navbar from '../Components/Navbar';

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


// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const SignIn = () => {
  const theme = createTheme();
  const [checked] = useState(false);
  const [idError, setIdError] = useState('');
  const history = useNavigate();

  

  const onhandlePost = async (data) => {
    const {password,id } = data;
    const getData = { password,id };

    // post
    await axios
      .post('http://localhost:8080/auth/register', {param : getData})
      .then(function (response) {
        if (response.status === "success"){
          console.log(response, '성공');
          const token = response.token;
          localStorage.setItem('jwtToken',token);
          history('/');
        }
        else{
          alert("실패");
          history("/SignIn");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const joinData = {
      password: data.get('password'),
      id : data.get('id'),
    };
    const { id } = joinData;

    // id 공백 체크
    if (id === '') setIdError('Id를 입력해주세요.');
    else setIdError('');

    console.log(joinData);

    if (
      checked
    ) {
      onhandlePost(joinData);
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <Header>
        <HeaderComment1>Polify</HeaderComment1>
    </Header>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="id"
                    name="id"
                    label="아이디"
                    error={idError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{idError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인
              </Button>
            </FormControl>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
};

export default SignIn;