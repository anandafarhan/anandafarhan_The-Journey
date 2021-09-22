import { createContext, useReducer } from 'react';

export const AppContext = createContext();

function isArrMatch(a, b) {
	let match = JSON.stringify(a) === JSON.stringify(b);
	return match;
}

const initialState = {
	isLoading: false,
	isLogin: false,
	modalLogin: false,
	modalRegister: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'REGISTER':
			localStorage.setItem('token', action.payload.token);
			console.log(action.payload);
			return {
				...state,
				isLogin: true,
				isLoading: false,
				user: {
					id: action.payload.id,
					name: action.payload.fullName,
					email: action.payload.email,
					phone: action.payload.phone,
					address: null,
					avatar: null,
				},
			};

		case 'LOGIN':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isLogin: true,
				isLoading: false,
				user: {
					id: action.payload.id,
					name: action.payload.fullName,
					email: action.payload.email,
					phone: action.payload.phone,
					address: action.payload.address,
					avatar: action.payload.avatar ? action.payload.avatar : null,
				},
			};

		case 'LOAD_USER':
			return {
				...state,
				isLogin: true,
				isLoading: false,
				user: {
					id: action.payload.id,
					name: action.payload.fullName,
					email: action.payload.email,
					phone: action.payload.phone,
					address: action.payload.address,
					avatar: action.payload.avatar ? action.payload.avatar : null,
				},
			};

		case 'AUTH_ERROR':
			localStorage.removeItem('token');
			return {
				...state,
				isLogin: false,
				isLoading: false,
				user: null,
			};

		case 'LOGOUT':
			localStorage.removeItem('token');

			return {
				...state,
				isLogin: false,
				isLoading: false,
				user: null,
			};

		case 'MODAL_LOGIN':
			return {
				...state,
				modalLogin: !state.modalLogin,
			};
		case 'MODAL_REGISTER':
			return {
				...state,
				modalRegister: !state.modalRegister,
			};
		case 'SWITCH_MODAL':
			return {
				...state,
				modalRegister: !state.modalRegister,
				modalLogin: !state.modalLogin,
			};

		case 'IS_LOADING_TRUE':
			return {
				...state,
				isLoading: true,
			};
		case 'IS_LOADING_FALSE':
			return {
				...state,
				isLoading: false,
			};

		default:
			throw new Error();
	}
};

export const AppContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <AppContext.Provider value={[state, dispatch]}>{props.children}</AppContext.Provider>;
};
