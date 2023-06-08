import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, CardContent, ListItemText, Button, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

const SurveyListPage = () => {
  const [surveyList, setSurveyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // 페이지 로드 시 공개 설문 리스트를 가져오는 요청을 보냅니다.
    fetchSurveyList(currentPage);
  }, [currentPage]);

  const fetchSurveyList = async (page) => {
    try {
      const response = await axios.get(`/surveys?page=${page}`);
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

  const handleViewMySurveys = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken"); // JWT 토큰 가져오기

      if (jwtToken) {
        // JWT 토큰이 있는 경우 자신이 만든 설문을 가져오는 요청을 보냅니다.
        const response = await axios.get(`/surveys/member?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        setSurveyList(response.data.surveys);
        setTotalPages(response.data.count);
      } else {
        alert("로그인이 되어있지 않습니다");
      }
    } catch (error) {
      console.error("Error fetching member surveys:", error);
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Grid container spacing={2} sx={{ maxWidth: "800px", width: "100%" }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Survey List
          </Typography>
          <Button variant="contained" onClick={handleViewMySurveys}>
            View My Surveys
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {surveyList.map((survey) => (
              <Grid item key={survey.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <ListItemText primary={survey.name} secondary={`Duration: ${survey.duration}`} />
                  </CardContent>
                  <Link to={`/survey/${survey.id}`}>View Details</Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button key={page} onClick={() => handlePageChange(page)}>
                {page}
              </button>
            ))}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SurveyListPage;
