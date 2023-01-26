import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const CartButton = (props) => {
	const dispatch = useDispatch();
	const totalItems = useSelector((state) => {
		return state.cart.totalQuantity;
	});

	const toggleHandler = () => {
		dispatch(uiActions.toggle());
	};
	return (
		<button onClick={toggleHandler} className={classes.button}>
			<span>My Cart</span>
			<span className={classes.badge}>{totalItems}</span>
		</button>
	);
};

export default CartButton;
