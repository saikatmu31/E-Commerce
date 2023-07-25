import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Base({ children }) {
	return (
		<>
			<Navbar />
			<div>{children}</div>
			<Footer />
		</>
	);
}