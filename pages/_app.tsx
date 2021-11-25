import '../styles/globals.scss';
import { useEffect } from 'react';
import { Provider } from 'next-auth/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		import('bootstrap/dist/js/bootstrap');
	}, []);

	return (
		<Provider>
			<Component {...pageProps} />
			<ToastContainer />
		</Provider>
	);
}

export default MyApp;
