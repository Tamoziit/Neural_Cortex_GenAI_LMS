import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/landing/Landing";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import { useAuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import CreateStudyGroup from "./pages/study-group/CreateStudyGroup";
import ManageStudyGroups from "./pages/study-group/ManageStudyGroups";

function App() {
	const { authUser, authInstitution } = useAuthContext();

	return (
		<>
			<div className="min-h-screen bg-gradient-to-br from-black via-black to-purple-950">

				<Routes>
					<Route path="/" element={authUser || authInstitution ? <Navigate to="/home" /> : <Landing />} />
					<Route path="/login" element={authUser || authInstitution ? <Navigate to="/home" /> : <Login />} />
					<Route path="/signup" element={authUser || authInstitution ? <Navigate to="/home" /> : <Signup />} />
					<Route path="/home" element={authUser || authInstitution ? <Home /> : <Navigate to="/" />} />
					<Route path="/profile" element={authUser || authInstitution ? <Profile /> : <Navigate to="/" />} />
					<Route path="/create-study-group" element={authUser || authInstitution ? <CreateStudyGroup /> : <Navigate to="/" />} />
					<Route path="/manage-study-groups" element={authUser || authInstitution ? <ManageStudyGroups /> : <Navigate to="/" />} />
				</Routes>

				<Toaster />
			</div>
		</>
	)
}

export default App
