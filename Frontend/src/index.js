import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./Routes";
import "./styles.css";
import toast, { Toaster } from "react-hot-toast";

ReactDOM.render(
	<>
		<Toaster />
		<AppRoutes />
	</>,
	document.getElementById("root")
);
