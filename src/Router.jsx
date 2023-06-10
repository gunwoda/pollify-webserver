import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import JoinForm from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CreateForm from "./pages/CreateForm";
import SurveyListPage from "./pages/QuerySurvey";
import SurveyResultsPage from "./pages/ResultSurvey";
import SurveyParticipationPage from "./pages/JoinSurvey";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/SignIn" element={<SignIn />} />
			<Route path="/SignUp" element={<JoinForm />} />
			<Route path='/createForm' element={<CreateForm/>} />
			<Route path='/QuerySurvey' element={<SurveyListPage/>} />
			<Route path='/ResultSurvey/:surveyId' element={<SurveyResultsPage/>} />
			<Route path='/joinsurvey/:surveyId' element={<SurveyParticipationPage/>} />
		</Routes>
	);
};

export default Router;
