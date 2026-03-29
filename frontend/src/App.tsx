import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

import Landing from "./pages/landing/Landing";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import CreateStudyGroup from "./pages/study-group/CreateStudyGroup";
import ManageStudyGroups from "./pages/study-group/ManageStudyGroups";
import StudyGroupDetails from "./pages/study-group/StudyGroupDetails";
import VerifyUsers from "./pages/verify-users/VerifyUsers";
import LearningPath from "./pages/learning-path/LearningPath";
import AssignRoadmap from "./pages/assign-roadmap/AssignRoadmap";

function App() {
	const { authUser, authInstitution } = useAuthContext();

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-black via-black to-purple-950">

				<Routes>
					{/* Common */}
					<Route path="/" element={authUser || authInstitution ? <Navigate to="/home" /> : <Landing />} />
					<Route path="/login" element={authUser || authInstitution ? <Navigate to="/home" /> : <Login />} />
					<Route path="/signup" element={authUser || authInstitution ? <Navigate to="/home" /> : <Signup />} />
					<Route path="/home" element={authUser || authInstitution ? <Home /> : <Navigate to="/" />} />
					<Route path="/profile" element={authUser || authInstitution ? <Profile /> : <Navigate to="/" />} />

					{/* Institution */}
					<Route path="/study-groups/create" element={authInstitution ? <CreateStudyGroup /> : <Navigate to="/" />} />
					<Route path="/study-groups/manage" element={authInstitution ? <ManageStudyGroups /> : <Navigate to="/" />} />
					<Route path="/study-groups/:id" element={authInstitution ? <StudyGroupDetails /> : <Navigate to="/" />} />
					<Route path="/verify-users" element={authInstitution ? <VerifyUsers /> : <Navigate to="/" />} />
					<Route path="/assign-roadmap" element={authInstitution ? <AssignRoadmap /> : <Navigate to="/" />} />

					{/* Users */}
					<Route path="/learning-path" element={authUser ? <LearningPath /> : <Navigate to="/" />} />
				</Routes>

				<Toaster />
			</div>
		</>
	)
}

export default App
