import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				"https://shoping-cart-88ce6-default-rtdb.firebaseio.com/cart.json"
			);

			if (!response.ok) {
				throw new Error("Could not fetch data!");
			}

			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(cartActions.replaceCart(cartData));
			dispatch();
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "fetching cart data failed!",
				})
			);
		}
	};
};

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "sending...",
				message: "sending cart data",
			})
		);

		const sendRequest = async () => {
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
		};

		try {
			await sendRequest();

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "success",
					message: "sent cart data successfully!",
				})
			);
		} catch (error) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "sent cart data failed!",
				})
			);
		}
	};
};
