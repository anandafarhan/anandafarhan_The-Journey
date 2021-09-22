import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import { useEffect, useContext } from 'react';

import { API, setAuthToken } from './config/server';
import { AppContext } from './context/AppContext';

import './App.css';
import Headers from './components/Navbar/Headers';
import Home from './pages/Home';
import JourneyDetail from './pages/JourneyDetail';
import NewJourney from './pages/NewJourney';
import Profile from './pages/Profile';
import Bookmarks from './pages/Bookmarks';

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
		console.log(process.env);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<ScrollToTop />
			<Headers />
			<div>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/profile' component={Profile} />
					<Route exact path='/bookmark' component={Bookmarks} />
					<Route exact path='/journey/:id' component={JourneyDetail} />
					<Route exact path='/journey' component={NewJourney} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
