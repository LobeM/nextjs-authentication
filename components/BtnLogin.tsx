import { signIn } from 'next-auth/client';
import { useState } from 'react';
import Loading from './Loading';
import { toast } from 'react-toastify';
import Router from 'next/router';

const BtnLogin = ({
	children,
	provider,
	bgColor,
	txtColor,
	csrfToken,
	options,
}) => {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		setLoading(true);
		const res = await signIn(provider.id, options);

		if (provider.id === 'credentials') {
			if (res.error) {
				if (res.error.includes('Success')) {
					await signIn('email', { email: options.email });
					setLoading(false);
					return toast.success(res.error);
				}
				setLoading(false);
				return toast.error(res.error);
			}

			setLoading(false);
			return Router.push('/');
		}

		setLoading(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type='hidden' name='csrfToken' defaultValue={csrfToken} />
			{children}
			<button
				type='submit'
				className='btn w-100 my-2 py-3'
				style={{ background: `${bgColor}`, color: `${txtColor}` }}
			>
				Sign in with {provider.name}
			</button>

			{loading && <Loading />}
		</form>
	);
};

BtnLogin.defaultProps = {
	txtColor: '#eee',
	children: undefined,
	options: undefined,
};

export default BtnLogin;
