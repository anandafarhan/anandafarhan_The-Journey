import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';

import { AppContext } from '../../context/AppContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [state] = useContext(AppContext);

	return (
		<>
			<Route
				{...rest}
				render={(props) => {
					if (state.isLogin === true) {
						return <Component {...props} />;
					} else {
						return <Redirect to='/' />;
					}
				}}
			/>
		</>
	);
};

export default PrivateRoute;
