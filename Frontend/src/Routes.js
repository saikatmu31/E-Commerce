import React, { useState } from "react";
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
import SignIn from "./user/Signin";
import Signup from "./user/Signup";
import OtpPage from "./user/OtpPage";
import { MyContext } from "./context/createContext";
import ProductDetails from "./core/ProductDetails";
import { Cart } from "./user/Cart";

const AppRoutes = () => {
	const [signupData, setSignupData] = useState({});
	return (
		<Router>
			<MyContext.Provider value={{ signupData, setSignupData }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/otp" element={<OtpPage />} />
					<Route path="/product/:id" element={<ProductDetails/>} />
					<Route path="/cart" element={<Cart/>} />
				</Routes>
			</MyContext.Provider>
		</Router>
	);
};

export default AppRoutes;
