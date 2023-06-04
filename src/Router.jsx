import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import JoinForm from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CreateForm from "./pages/CreateForm";
import QuerySurvey from "./pages/QuerySurvey";
import SurveyResultsPage from "./pages/ResultSurvey";
import SurveyParticipation from "./pages/JoinSurvey";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/SignIn" element={<SignIn />} />
			<Route path="/SignUp" element={<JoinForm />} />
			<Route path='/createForm' element={<CreateForm/>} />
			<Route path='/QuerySurvey' element={<QuerySurvey/>} />
			<Route path='/ResultSurvey' element={<SurveyResultsPage/>} />
			<Route path='/joinsurvey' element={<SurveyParticipation/>} />
			
		</Routes>
	);
};

export default Router;
