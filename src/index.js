import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import { AppContextProvider } from './context/AppContext';

ReactDOM.render(
	<React.StrictMode>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
