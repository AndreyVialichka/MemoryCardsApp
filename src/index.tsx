import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { App } from 'app/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, createBrowserRouter, HashRouter, RouterProvider } from 'react-router-dom';
import { Register } from 'features/auth/Register/Register';
import { Login } from 'features/auth/Login/Login';
import { GlobalError } from 'common/components/GlobalError/GlobalError';
import 'react-toastify/dist/ReactToastify.css';
import { Packs } from 'features/packs/Packs/Packs';
import { Counter } from 'features/counter/Counter';
import { Cards } from 'features/cards/componets/Cards/Cards';
import ForgotPasport from 'features/auth/PasswordRestore/ForgotPassword/ForgotPassword'
import CreateNewPassword from 'features/auth/PasswordRestore/CreateNewPassword/CreateNewPassword'
import CheckEmail from 'features/auth/PasswordRestore/CheckEmail/CheckEmail';
import Learn from 'features/cards/componets/Learn/Learn';
import Profile from 'features/auth/Profile/Profile';
import Header from 'features/auth/Header/Header';


const router = createBrowserRouter([
	{
		path: "/",
		element: <Header/>,
		children:[
				{
					path: '/login',
					element: <Login/>,
				},
				{
					path: '/register',
					element: <Register/>,
				},
				{
					path: '/forgotpassword',
					element: <ForgotPasport/>,
				},
				{
					path: '/packs',
					element: <Packs/>,
				},
				{
					path: '/cards/:packId/:searchParams?',
					element: <Cards/>,
				},
				{
					path: '/createnewpassword/:token',
					element: <CreateNewPassword/>,
				},
				{
					path: '/checkemail',
					element: <CheckEmail/>,
				},
				{
					path: '/learn/:packId',
					element: <Learn/>,
				},
				{
					path: '/profile',
					element: <Profile/>,
				}]
	}
]);
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<GlobalError/>
			<App />
		</Provider>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
