import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
	const dispatch = useDispatch();

	const isCartShown = useSelector((state) => {
		return state.ui.isCartShown;
	});
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);
	useEffect(() => {
		const sendCartData = async () => {
			dispatch(
				uiActions.showNotification({
					status: "pending",
					title: "sending...",
					message: "sending cart data",
				})
			);
			const response = await fetch(
				"https://shoping-cart-88ce6-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify(cart),
				}
			);

			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "success",
					message: "sent cart data successfully!",
				})
			);
		};
		if (isInitial) {
			isInitial = false;
			return;
		}
		sendCartData().catch((error) => {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "sent cart data failed!",
				})
			);
		});
	}, [cart, dispatch]);
	console.log("app component runs");
	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{isCartShown && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
