import React, { useState } from 'react';
import axios from 'axios';

const SurveyParticipation = () => {
  const [subjectiveData, setSubjectiveData] = useState({
    question: 'test question',
    detailType: 'SUBJECTIVE',
    resultCount: 1,
    results: [
      {
        content: 'content',
      },
      // ...
    ],
  });

  const [multipleChoiceData, setMultipleChoiceData] = useState({
    question: 'test question2',
    detailType: 'MULTIPLE_CHOICE',
    options: [
      {
        optionId: 1,
        option: 'choice 1',
      },
      // ...
    ],
    resultCount: 1,
    results: [
      {
        selectOptionId: 1,
      },
      // ...
    ],
  });

  const handleSubmit = async () => {
    try {
      await axios.post('/survey-participation', {
        surveyDetails: [subjectiveData, multipleChoiceData],
      });
      console.log('설문 결과가 성공적으로 제출되었습니다.');
      // 원하는 처리를 추가하세요 (예: 페이지 리디렉션 등)
    } catch (error) {
      console.error('설문 결과 제출 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div>
      <h1>설문 참여 페이지</h1>
      {/* 주관식 설문 참여 입력 폼 */}
      <div>
        <h2>{subjectiveData.question}</h2>
        <ul>
          {subjectiveData.results.map((result, index) => (
            <li key={index}>
              <input
                type="text"
                value={result.content}
                onChange={(e) =>
                  setSubjectiveData((prevData) => ({
                    ...prevData,
                    results: prevData.results.map((r, i) =>
                      i === index ? { ...r, content: e.target.value } : r
                    ),
                  }))
                }
              />
            </li>
          ))}
        </ul>
      </div>

      {/* 객관식 설문 참여 입력 폼 */}
      <div>
        <h2>{multipleChoiceData.question}</h2>
        <ul>
          {multipleChoiceData.options.map((option) => (
            <li key={option.optionId}>
              <label>
                <input
                  type="checkbox"
                  checked={multipleChoiceData.results.some(
                    (result) => result.selectOptionId === option.optionId
                  )}
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      setMultipleChoiceData((prevData) => ({
                        ...prevData,
                        results: [
                          ...prevData.results,
                          { selectOptionId: option.optionId },
                        ],
                      }));
                    } else {
                      setMultipleChoiceData((prevData) => ({
                        ...prevData,
                        results: prevData.results.filter(
                          (result) => result.selectOptionId !== option.optionId
                        ),
                      }));
                    }
                  }}
                />
                {option.option}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* 제출 버튼 */}
      <button onClick={handleSubmit}>설문 결과 제출</button>
    </div>
  );
};

export default SurveyParticipation;