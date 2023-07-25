import React from "react";
import Home from "./core/Home";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Navigate,
	// Link,
	// Outlet,
	// useParams,
	// NavLink,
	// useNavigate,
	// useLocation,
} from "react-router-dom";
import Profile from "./user/Profile";
import Orders from "./admin/Orders";
import Signup from "./user/Signup";
import SignIn from "./user/Signin";

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/orders" element={<Orders />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<SignIn />} />
				
			</Routes>
		</Router>
	);
};

export default AppRoutes;
