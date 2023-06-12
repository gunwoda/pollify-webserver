import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, List, ListItem, ListItemText, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import styled from "styled-components";

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
        console.log("Fetching data...");

        if (jwtToken) {
          const response = await axios.get(
            `http://172.25.235.136/api/surveys/${surveyId}/results`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          console.log(response);

          setSurveyResults(response.data);
        } else {
          setTimeout(() => {
            alert("Please login to access the survey results");
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

  const countOptionResponses = (optionId) => {
    let count = 0;

    if (surveyDetails) {
      surveyDetails.forEach((surveyDetail) => {
        if (surveyDetail.detailType === "MULTIPLE_CHOICE") {
          surveyDetail.results.forEach((result) => {
            if (result.selectOptionId === optionId) {
              count += 1;
            }
          });
        }
      });
    }

    return count;
  };

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

        {surveyDetails &&
          surveyDetails.map((surveyDetail) => (
            <Card key={surveyDetail.question} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{surveyDetail.question}</Typography>

                {surveyDetail.detailType === "SUBJECTIVE" ? (
                  <List>
                    {surveyDetail.results.map((result, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={result.content} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <List>
                    {surveyDetail.options.map((option) => (
                      <ListItem key={option.optionId}>
                        <ListItemText primary={option.option} />
                        <Typography>Response Count: {countOptionResponses(option.optionId)}</Typography>
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          ))}
      </Box>
    </>
  );
};

export default SurveyResultsPage;
