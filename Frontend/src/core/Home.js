import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../Backend";
import { Base } from "./Base";

const shuffle = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export default function Home() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API}products/getAllProducts`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			const shuffledProducts = shuffle(data.data);
			setProducts(shuffledProducts.slice(0, 32));
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	return (
		<Base>
			<div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
				{products.map((product) => (
					<Link key={product._id} to={`/product/${product._id}`}>
						<div className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]">
							<img
								src={product.photos}
								alt={product.name}
								className="z-0 h-full w-full rounded-md object-cover"
							/>
							<div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
							<div className="absolute bottom-4 left-4 text-left">
								<h1 className="text-lg font-semibold text-white">
									{product.name}
								</h1>
								<p className="mt-2 text-sm text-gray-300">
									{product.description}
								</p>
								<button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
									Shop Now &rarr;
								</button>
							</div>
						</div>
					</Link>
				))}
			</div>
		</Base>
	);
}
