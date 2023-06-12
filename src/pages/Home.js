import Navbar from '../Components/Navbar';
import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, CardContent, ListItemText, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

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

const Home = () => {
  const [surveyList, setSurveyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // 페이지 로드 시 공개 설문 리스트를 가져오는 요청을 보냅니다.
    fetchSurveyList(currentPage);
  }, [currentPage]);

  const fetchSurveyList = async (page) => {
    try {
      const response = await axios.get(`http://172.25.235.136/api/surveys?page=${page}`);
      console.log(response);
      const surveyListData = response.data;
      setSurveyList(surveyListData.surveys);
      setTotalPages(surveyListData.count);
    } catch (error) {
      console.error("Error fetching survey list:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
    <Navbar></Navbar>
    <Header>
        <HeaderComment1>Polify</HeaderComment1>
    </Header>
    <Box display="flex" justifyContent="center">
      <Grid container spacing={2} sx={{ maxWidth: "800px", width: "100%" }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Survey List
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {surveyList.map((survey) => (
              <Grid item key={survey.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <ListItemText primary={survey.name} secondary={`Duration: ${survey.duration}`} />
                  </CardContent>
                  <Link to={`/joinsurvey/${survey.id}`}>View Details</Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Home;
