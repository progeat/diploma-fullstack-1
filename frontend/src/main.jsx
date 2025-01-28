import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './App.jsx';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
);
