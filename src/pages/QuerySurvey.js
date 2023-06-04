import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuerySurvey = () => {
  const [surveys, setSurveys] = useState(
    {
      count: 0, // 설문 목록의 총 개수
      surveys: [ // 설문 목록 배열
        {
          id: 0, // 설문 ID
          name: "test", // 설문 이름
          duration: 30 // 설문 지속 시간 (분)
        },
        // ...
      ]
    }
  );
  const [showMySurveys, setShowMySurveys] = useState(false);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [userID, setUserID] = useState('');
/*
  useEffect(() => {
    // JWT 토큰을 로컬 스토리지에서 가져옵니다.
    const token = localStorage.getItem('jwtToken');

    // JWT 토큰이 존재한다면 디코딩하여 사용자 정보를 확인합니다.
    if (token) {
      const decodedToken = JSON.parse(window.atob(token.split('.')[1]));

      // 현재 사용자의 ID와 토큰에 저장된 사용자 ID를 비교하여 자기 자신 여부를 확인합니다.
      const currentUserID = decodedToken.userID;
      setUserID(currentUserID);
    }
  }, []);

  useEffect(() => {
    // 필터링 로직을 적용하여 설문 목록을 필터링합니다.
    let filtered;
    if (showMySurveys) {
      filtered = surveys.filter((survey) => survey.member === userID);
    } else {
      filtered = surveys;
    }
    setFilteredSurveys(filtered);
  }, [showMySurveys, surveys, userID]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const page = 1; // Replace with the desired page number
        const response = await axios.get(`/surveys/member?page=${page}`);
        setSurveys(response.data.surveys);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, []);
*/
  const handleCheckboxChange = (e) => {
    setShowMySurveys(e.target.checked);
  };
  console.log(surveys.surveys[0].id);

  return (
    <div>
      <h1>설문 목록</h1>
      <label>
        <input
          type="checkbox"
          checked={showMySurveys}
          onChange={handleCheckboxChange}
        />
        내가 작성한 설문
      </label>
      <ul>
        {filteredSurveys.map((survey) => (
          <li key={survey.id}>
            <Link to={`/survey/${survey.id}`}>{survey.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuerySurvey;