import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Navbar from '../Components/Navbar';
import styled from 'styled-components';

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

const SurveyResultsPage = ({ match }) => {
  const [surveyResults, setSurveyResults] = useState(null);
  const navigate = useNavigate();
  const { surveyId } = useParams();

  useEffect(() => {
    const fetchSurveyResults = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken"); // JWT 토큰 가져오기

        // JWT 토큰이 있는 경우 요청을 보냅니다.
        if (jwtToken) {
          const response = await axios.get(`/surveys/${surveyId}/results`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });

          setSurveyResults(response.data);
        } else {
          // JWT 토큰이 없는 경우 로그인 페이지로 이동 또는 다른 처리를 진행합니다.
          setTimeout(() => {
            alert("로그인 후 이용가능합니다");
            navigate("/SignIn"); // 원하는 경로로 이동합니다.
          }, 10);
        }
      } catch (error) {
        console.error("Error fetching survey results:", error);
      }
    };

    fetchSurveyResults();
  }, [surveyId,navigate]);

  if (!surveyResults) {
    return <Typography>Loading survey results...</Typography>;
  }

  const { name, surveyDetails } = surveyResults;

  return (
    <>
    <Navbar></Navbar>
    <Header>
        <HeaderComment1>Polify</HeaderComment1>
    </Header>
    <Box>
      <Typography variant="h4" gutterBottom>
        Survey Results: {name}
      </Typography>

      {surveyDetails.map((surveyDetail) => (
        <div key={surveyDetail.question}>
          <Typography variant="h6">{surveyDetail.question}</Typography>

          {surveyDetail.detailType === "SUBJECTIVE" ? (
            <div>
              {surveyDetail.results.map((result, index) => (
                <Typography key={index}>{result.content}</Typography>
              ))}
            </div>
          ) : (
            <div>
              {surveyDetail.options.map((option) => (
                <div key={option.optionId}>
                  <Typography variant="subtitle1">{option.option}</Typography>
                  <Typography>Result Count: {option.resultCount}</Typography>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </Box>
    </>
  );
};

export default SurveyResultsPage;
