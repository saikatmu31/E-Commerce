import React, { useContext, useEffect, useState } from "react";
import { Base } from "../core/Base";
import { API } from "../Backend";
import { Heart, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { MyContext } from "../context/createContext";
import { useNavigate } from "react-router-dom";
function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
		document.body.appendChild(script);
	});
}
const Cart = () => {
	async function displayRazorpay(cartId) {
		// console.log("CARTID", cartId);
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);

		if (!res) {
			toast.error("Razorpay SDK failed to load. Are you online?");
			return;
		}

		const response = await fetch(`${API}payment/payment`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ cartId: cartId }),
		});
		const { data } = await response.json();
		// console.log("DATA", data);
		// console.log(typeof data.amount);
		const options = {
			key: "rzp_test_Ba4obypUHm3Ows",
			currency: data.currency,
			amount: data.amount,
			order_id: data.id,
			// handler: function (response) {
			// 	alert(response.razorpay_payment_id);
			// 	alert(response.razorpay_order_id);
			// 	alert(response.razorpay_signature);
			// },
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	const [cart, setCart] = useState(null);
	const [count, setCount] = useState(0);
	const { cartCount, setCartCount } = useContext(MyContext);
	// Fetch cart data from the API
	const userData = JSON.parse(localStorage.getItem("jwt"));
	const id = userData.user._id;
	const navigate = useNavigate();

	const fetchCartData = async () => {
		try {
			const response = await fetch(`${API}cart/cart`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: id }),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch cart data");
			}

			const data = await response.json();
			setCart(data.cart);
			setCartCount(data.cart.items.length);
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	const updateQuantity = async (productId, quantity) => {
		try {
			const response = await fetch(`${API}cart/updateQuantity`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: id,
					productId: productId,
					quantity: quantity,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch cart data");
			}
			// console.log("Response", response.body);
			const data = await response.json();
			setCart(data.cart);
			if (response.body.success === true) {
				toast.success(response.message);
			} else {
				// toast.error(response);
			}
			setCount(count + 1);
			return data;
		} catch (error) {
			toast.error(error.message);

			console.log(error);
		}
	};
	const deleteProduct = async (productId) => {
		try {
			const response = await fetch(`${API}cart/removefromcart`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: id,
					productId: productId,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch cart data");
			}
			// console.log(response);
			const data = await response.json();
			setCart(data.cart);
			if (response.success === true) {
				toast.success(response.message);
			} else {
				// toast.error(response.message);
			}
			setCount(count + 1);

			return data;
		} catch (error) {
			toast.error(error.message);

			console.log(error);
		}
	};
	useEffect(() => {
		const fetchCartDataAndSetCart = async () => {
			const data = await fetchCartData();
			// console.log(data);
		};
		fetchCartDataAndSetCart();
	}, [count]);

	// Calculate the total amount based on the cart items
	const calculateTotalAmount = () => {
		if (!cart || !cart.items) return 0;

		return cart.items.reduce((total, item) => {
			return total + item.productId.price * item.quantity;
		}, 0);
	};

	if (!cart) {
		return <div>Loading cart data...</div>;
	}

	return (
		<Base>
			<div className="mx-auto max-w-7xl px-2 lg:px-0 my-5">
				<div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Shopping Cart
					</h1>
					<form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
						<section
							aria-labelledby="cart-heading"
							className="rounded-lg bg-white lg:col-span-8"
						>
							<h2 id="cart-heading" className="sr-only">
								Items in your shopping cart
							</h2>
							<ul role="list" className="divide-y divide-gray-200">
								{cart.items.map((item) => (
									<div key={item._id} className="">
										<li className="flex py-6 sm:py-6 ">
											<div className="flex-shrink-0">
												<img
													src={item.productId.photos}
													alt={item.productId.name}
													className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
												/>
											</div>
											<div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
												<div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
													<div>
														<div className="flex justify-between">
															<h3 className="text-sm">
																<a
																	href="#"
																	className="font-semibold text-black"
																>
																	{item.productId.name}
																</a>
															</h3>
														</div>
														<div className="mt-1 flex text-sm">
															<p className="text-sm text-gray-500">
																{item.productId.description}
															</p>
														</div>
														<div className="mt-1 flex items-center ">
															<p className="text-xl font-medium text-green-600 ">
																₹ {item.productId.price}
															</p>
															<p className="text-sm font-medium text-gray-900">
																&nbsp;&nbsp;Qty: {item.quantity}
															</p>
														</div>
													</div>
												</div>
											</div>
										</li>
										<div className="mb-2 flex">
											<div className="min-w-24 flex">
												<button
													type="button"
													className="h-7 w-7"
													onClick={() =>
														updateQuantity(
															item.productId._id,
															item.quantity - 1
														)
													}
												>
													-
												</button>
												<input
													type="text"
													className="mx-1 h-7 w-9 rounded-md border text-center"
													value={item.quantity}
													readOnly
												/>
												<button
													type="button"
													className="flex h-7 w-7 items-center justify-center"
													onClick={() =>
														updateQuantity(
															item.productId._id,
															item.quantity + 1
														)
													}
												>
												</button>
											</div>
											<div className="ml-6 flex text-sm">
												<button
													type="button"
													className="flex items-center space-x-1 px-2 py-1 pl-0"
													onClick={() => deleteProduct(item.productId._id)}
												>
													<Trash size={12} className="text-red-500" />
													<span className="text-xs font-medium text-red-500">
														Remove
													</span>
												</button>
											</div>
										</div>
									</div>
								))}
							</ul>
						</section>
						{/* Order summary */}
						<section
							aria-labelledby="summary-heading"
							className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
						>
							<h2
								id="summary-heading"
								className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
							>
								Price Details
							</h2>
							<div>
								<dl className=" space-y-1 px-2 py-4">
									<div className="flex items-center justify-between">
										<dt className="text-sm text-gray-800">
											Price ({cart.items.length} items)
										</dt>
										<dd className="text-sm font-medium text-gray-900">
											₹ {calculateTotalAmount().toFixed(2)}
										</dd>
									</div>
									{/* ... */}
									<div className="flex items-center justify-between border-y border-dashed py-4 ">
										<dt className="text-base font-medium text-gray-900">
											Total Amount
										</dt>
										<dd className="text-base font-medium text-gray-900">
											₹ {calculateTotalAmount().toFixed(2)}{" "}
											{/* Render the dynamically calculated total amount */}
										</dd>
									</div>
									<button
										type="button"
										className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
										onClick={() => displayRazorpay(cart._id)}
									>
										Buy Now
									</button>
								</dl>
								{/* ... */}
							</div>
						</section>
					</form>
				</div>
			</div>
		</Base>
	);
};

export default Cart;
