import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SurveyResults = ({ surveyId }) => {
  const [survey, setSurvey] = useState(
    {
        name: "survey name",
        surveyDetails: [
          {
            question: "test question",
            detailType: "SUBJECTIVE", // SUBJECTIVE, MULTIPLE_CHOICE
            resultCount: 1,
            results: [
              {
                content: "content"
              },
              // ...
            ]
          },
          {
            question: "test question2",
            detailType: "MULTIPLE_CHOICE", // SUBJECTIVE, MULTIPLE_CHOICE
            options: [
              {
                optionId: 1,
                option: "choice 1"
              },
              // ...
            ],
            resultCount: 1,
            results: [
              {
                selectOptionId: 1
              },
              // ...
            ]
          },
          // ...
        ]
      }


  );
/*
  useEffect(() => {
    const fetchSurveyResults = async () => {
      try {
        const response = await axios.get(`/surveys/${surveyId}/results`);
        setSurvey(response.data);
      } catch (error) {
        console.error('설문 결과를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchSurveyResults();
  }, [surveyId]);

  if (!survey) {
    return <div>설문 결과를 불러오는 중입니다...</div>;
  }
*/
  console.log(survey);
  return (
    <div>
      <h1>{survey.name}</h1>
      <ul>
        {survey.surveyDetails.map((detail) => (
          <li key={detail.question}>
            <h2>{detail.question}</h2>
            {detail.detailType === 'SUBJECTIVE' ? (
              <ul>
                {detail.results.map((result, index) => (
                  <li key={index}>{result.content}</li>
                ))}
              </ul>
            ) : (
              <ul>
                {detail.options.map((option) => (
                  <li key={option.optionId}>
                    {option.option} ({detail.results.filter(
                      (result) => result.selectOptionId === option.optionId
                    ).length})
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyResults;