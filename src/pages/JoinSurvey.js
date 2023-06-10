import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, TextField, Button, Grid, Box } from "@mui/material";
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


const SurveyParticipationPage = ({ match }) => {
  const { surveyId } = useParams();
  const [surveyDetails, setSurveyDetails] = useState([]);
  const [surveyResults, setSurveyResults] = useState([]);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const response = await axios.get(`http://172.25.235.136:31081/surveys/${surveyId}`);
        setSurveyDetails(response.data.surveyDetails);
        console.log(response);
      } catch (error) {
        console.error("Error fetching survey details:", error);
      }
    };

    fetchSurveyDetails();
  }, [surveyId]);

  const handleInputChange = (detailId, value) => {
    const updatedResults = surveyResults.map((result) => {
      if (result.surveyDetailId === detailId) {
        return { ...result, content: value };
      }
      return result;
    });
    setSurveyResults(updatedResults);
  };

  const handleOptionSelect = (detailId, optionId) => {
    const updatedResults = surveyResults.map((result) => {
      if (result.surveyDetailId === detailId) {
        return { ...result, optionId };
      }
      return result;
    });
    setSurveyResults(updatedResults);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        surveyResults: surveyResults,
      };
      const response = await axios.post(`http://172.25.235.136:31081/api/surveys/${surveyId}/results`, payload);
      console.log(response);
      console.log(payload);
      console.log("Survey participation submitted:", response.data);
    } catch (error) {
      console.error("Error submitting survey participation:", error);
    }
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
            Survey Participation
          </Typography>
        </Grid>
        {surveyDetails.map((detail) => (
          <Grid item key={detail.id} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">{detail.question}</Typography>
                {detail.detailType === "SUBJECTIVE" && (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={surveyResults.find((result) => result.surveyDetailId === detail.id)?.content || ""}
                    onChange={(e) => handleInputChange(detail.id, e.target.value)}
                  />
                )}
                {detail.detailType === "MULTIPLE_CHOICE" && (
                  <Grid container spacing={2}>
                    {detail.options.map((option) => (
                      <Grid item key={option.optionId}>
                        <Button
                          variant="contained"
                          onClick={() => handleOptionSelect(detail.id, option.optionId)}
                          disabled={surveyResults.find((result) => result.surveyDetailId === detail.id)?.optionId === option.optionId}
                        >
                          {option.option}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default SurveyParticipationPage;
