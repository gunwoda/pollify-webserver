import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Grid,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const CreateForm = () => {
  const [surveyName, setSurveyName] = useState("");
  const [duration, setDuration] = useState(30);
  const [visibility, setVisibility] = useState(true);
  const [surveyDetails, setSurveyDetails] = useState([
    {
      question: "",
      surveyDetailType: "SUBJECTIVE",
      options: [],
    },
  ]);

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSurveyDetails = [...surveyDetails];
    updatedSurveyDetails[index][name] = value;
    setSurveyDetails(updatedSurveyDetails);
  };

  const handleSurveyDetailTypeChange = (e, index) => {
    const { value } = e.target;
    const updatedSurveyDetails = [...surveyDetails];
    updatedSurveyDetails[index].surveyDetailType = value;
    setSurveyDetails(updatedSurveyDetails);
  };

  const handleOptionChange = (e, surveyIndex, optionIndex) => {
    const { value } = e.target;
    const updatedSurveyDetails = [...surveyDetails];
    updatedSurveyDetails[surveyIndex].options[optionIndex].option = value;
    setSurveyDetails(updatedSurveyDetails);
  };

  const handleAddQuestion = () => {
    setSurveyDetails([
      ...surveyDetails,
      {
        question: "",
        surveyDetailType: "SUBJECTIVE",
        options: [],
      },
    ]);
  };

  const handleAddOption = (index) => {
    const updatedSurveyDetails = [...surveyDetails];
    updatedSurveyDetails[index].options.push({ option: "" });
    setSurveyDetails(updatedSurveyDetails);
  };

  const handleRemoveQuestion = (index) => {
    const updatedSurveyDetails = [...surveyDetails];
    updatedSurveyDetails.splice(index, 1);
    setSurveyDetails(updatedSurveyDetails);
  };

  const handleRemoveOption = (surveyIndex, optionIndex) => {
    const updatedSurveyDetails = [...surveyDetails];
    updatedSurveyDetails[surveyIndex].options.splice(optionIndex, 1);
    setSurveyDetails(updatedSurveyDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const surveyData = {
      name: surveyName,
      duration: duration,
      visibility: visibility,
      surveyDetails: surveyDetails,
    };

    try {
      const response = await axios.post("/surveys", surveyData);
      const responseData = response.data;
      
      if (responseData.status === "success") {
        // 성공적인 응답 처리
        console.log("Survey creation successful");
      } else if (responseData.status === "fail") {
        // 실패 응답 처리
        console.log("Survey creation failed:", responseData.reason);
      }
    } catch (error) {
      // 오류 처리
      console.error("Survey creation error:", error);
    }
    
    console.log(surveyData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ maxWidth: 400, margin: "0 auto" }}>
        <Grid item xs={12}>
          <TextField
            label="Survey Name"
            value={surveyName}
            onChange={(e) => setSurveyName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Duration (in days)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={visibility}
                onChange={(e) => setVisibility(e.target.checked)}
              />
            }
            label="Visibility"
          />
        </Grid>
        {surveyDetails.map((survey, index) => (
          <Grid item xs={12} key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Question"
                  name="question"
                  value={survey.question}
                  onChange={(e) => handleQuestionChange(e, index)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Survey Detail Type</InputLabel>
                  <Select
                    value={survey.surveyDetailType}
                    onChange={(e) => handleSurveyDetailTypeChange(e, index)}
                  >
                    <MenuItem value="SUBJECTIVE">Subjective</MenuItem>
                    <MenuItem value="MULTIPLE_CHOICE">Multiple Choice</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {survey.surveyDetailType === "MULTIPLE_CHOICE" && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutline />}
                  onClick={() => handleAddOption(index)}
                  sx={{ mt: 2, mb: 1 }}
                >
                  Add Option
                </Button>
                {survey.options.map((option, optionIndex) => (
                  <Grid container alignItems="center" spacing={1} key={optionIndex}>
                    <Grid item xs={9}>
                      <TextField
                        label="Option"
                        value={option.option}
                        onChange={(e) =>
                          handleOptionChange(e, index, optionIndex)
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveOption(index, optionIndex)}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </>
            )}
            <Button
              variant="outlined"
              color="error"
              startIcon={<RemoveCircleOutline />}
              onClick={() => handleRemoveQuestion(index)}
              sx={{ mt: 1, mb: 2 }}
            >
              Remove Question
            </Button>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={handleAddQuestion}
          >
            Add Question
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateForm;
