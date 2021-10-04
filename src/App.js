import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import { useEffect, useContext } from 'react';

import { API, setAuthToken } from './config/server';
import { AppContext } from './context/AppContext';

import PrivateRoute from './components/Routes/PrivateRoute';
import JourneyDetail from './pages/JourneyDetail';
import Headers from './components/Navbar/Headers';
import EditJourney from './pages/EditJourney';
import NewJourney from './pages/NewJourney';
import Bookmarks from './pages/Bookmarks';
import Profile from './pages/Profile';
import Home from './pages/Home';
import './App.css';

function App() {
	const [state, dispatch] = useContext(AppContext);

	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	const loadUser = async () => {
		dispatch({ type: 'IS_LOADING_TRUE' });
		try {
			const response = await API('/auth');

			dispatch({
				type: 'LOAD_USER',
				payload: response.data.data,
			});
		} catch (err) {
			dispatch({
				type: 'AUTH_ERROR',
			});
		}
		dispatch({ type: 'IS_LOADING_FALSE' });
	};

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<ScrollToTop />
			<Headers />
			<div>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/journey/:id' component={JourneyDetail} />
					<PrivateRoute exact path='/profile' component={Profile} />
					<PrivateRoute exact path='/bookmark' component={Bookmarks} />
					<PrivateRoute exact path='/journey' component={NewJourney} />
					<PrivateRoute exact path='/editJourney/:id' component={EditJourney} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
