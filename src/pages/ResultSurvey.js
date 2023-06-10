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
  const [surveyResults, setSurveyResults] = useState({});
  const navigate = useNavigate();
  const { surveyId } = useParams();

  useEffect(() => {
    const fetchSurveyResults = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        console.log("fetch");

        if (jwtToken) {
          const response = await axios.get(`http://172.25.235.136/api/surveys/${surveyId}/results`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          console.log(response);

          setSurveyResults(response.data);
        } else {
          setTimeout(() => {
            alert("로그인 후 이용 가능합니다");
            navigate("/SignIn");
          }, 10);
        }
      } catch (error) {
        console.error("Error fetching survey results:", error);
      }
    };

    fetchSurveyResults();
  }, [surveyId, navigate]);

  const { name, surveyDetails } = surveyResults;

  return (
    <>
      <Navbar />
      <Header>
        <HeaderComment1>Polify</HeaderComment1>
      </Header>
      <Box>
        <Typography variant="h4" gutterBottom>
          Survey Results: {name}
        </Typography>

        {surveyDetails && surveyDetails.map((surveyDetail) => (
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
