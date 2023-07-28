import React, { useContext, useEffect, useState } from "react";
import { Star, ChevronDown, CloudCog } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { API } from "../Backend";
import { Base } from "./Base";
import { toast } from "react-hot-toast";
import { MyContext } from "../context/createContext";

function ProductDetails() {
	const { id } = useParams();
	const [productDetails, setProductDetails] = useState(null);
	const [otherProducts, setOtherProducts] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetchProductDetails();
		fetchOtherProducts();
	}, [id]);

	const fetchProductDetails = async () => {
		try {
			const response = await fetch(`${API}products/productDetails/${id}`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			setProductDetails(data.data);
		} catch (error) {
			console.error("Error fetching product details:", error);
		}
	};

	const fetchOtherProducts = async () => {
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
			setOtherProducts(shuffledProducts.slice(0, 4));
		} catch (error) {
			console.error("Error fetching other products:", error);
		}
	};
	const addToCart = async (productId) => {
		const userData = JSON.parse(localStorage.getItem("jwt"));
		const userid = userData.user._id;
		try {
			if (!userid) {
				toast.error("Please Login to Continue");
			}
			const response = await fetch(`${API}cart/addtocart`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: userid,
					productId: productId,
					quantity: 1,
				}),
			});
			const data = await response.json();
			// console.log("MESSAGE", data.message);
			if (data.success === true) {
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	return (
		<Base>
			<div>
				{productDetails ? (
					<section className="overflow-hidden">
						<div className="mx-auto max-w-5xl px-5 py-24">
							<div className="mx-auto flex flex-wrap items-center lg:w-[90%]">
								<img
									alt={productDetails.name}
									className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
									src={productDetails.photos}
								/>
								<div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
									<h1 className="my-4 text-3xl font-semibold text-black">
										{productDetails.name}
									</h1>
									<div className="my-4 flex items-center">
										<span className="flex items-center space-x-1">
											{[...Array(5)].map((_, i) => (
												<Star key={i} size={16} className="text-yellow-500" />
											))}
											<span className="ml-3 inline-block text-xs font-semibold">
												4 Reviews
											</span>
										</span>
									</div>
									<p className="leading-relaxed">
										{productDetails.description}
									</p>
									<div className="flex items-center justify-between mt-14">
										<span className="title-font text-xl font-bold text-gray-900">
											₹{productDetails.price}
										</span>

										<button
											type="button"
											className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
											onClick={() => addToCart(productDetails._id)}
										>
											Add to Cart
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>
				) : (
					<div>Loading...</div>
				)}
				<div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
					{otherProducts.map((product, index) => (
						<div key={index} className="rounded-md border">
							<img
								src={product.photos}
								alt={product.name}
								className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
							/>
							<div className="p-4">
								<h1 className="inline-flex items-center text-lg font-semibold">
									{product.name}
								</h1>
								<p className="mt-3 text-sm text-gray-600">
									{product.description}
								</p>
								<NavLink to={`/product/${product._id}`}>
									<button
										type="button"
										className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
									>
										View More
									</button>
								</NavLink>
							</div>
						</div>
					))}
				</div>
			</div>
		</Base>
	);
}

export default ProductDetails;
