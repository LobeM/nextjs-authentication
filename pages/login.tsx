import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { providers, getSession, csrfToken } from 'next-auth/client';
import Router from 'next/router';
import { toast } from 'react-toastify';
import CredentialsAuth from '../components/CredentialsAuth';
import { NextPageContext } from 'next';
import OAuth from '../components/OAuth';
import OrDivider from '../components/OrDivider';
import EmailAuth from '../components/EmailAuth';

export const getServerSideProps = async (context: NextPageContext) => {
	return {
		props: {
			providers: await providers(),
			session: await getSession(context),
			csrfToken: await csrfToken(context),
		},
	};
};

const Login = ({ providers, session, csrfToken }) => {
	useEffect(() => {
		const checkSession = () => {
			if (session) return Router.push('/');
		};
		checkSession();
	}, [session]);

	useEffect(() => {
		const checkError = () => {
			if (Router.query.error) {
				toast.error(Router.query.error);
				return Router.push('/login');
			}
		};
		checkError();
	}, []);

	if (session) return null;

	return (
		<Container>
			<div
				className='d-flex justify-content-center align-items-center'
				style={{ minHeight: '100vh' }}
			>
				<div
					style={{ maxWidth: '450px', width: '100%' }}
					className='border border-1 max-auto p-4 shadow'
				>
					<h2
						className='text-center fw-bolder text-uppercase'
						style={{ color: '#555', letterSpacing: '1px' }}
					>
						NextAuth - World
					</h2>
					<p className='text-center'>Login with NextAuth</p>
					<CredentialsAuth providers={providers} csrfToken={csrfToken} />
					<OrDivider />
					<OAuth providers={providers} csrfToken={csrfToken} />
					<OrDivider />
					<EmailAuth providers={providers} csrfToken={csrfToken} />
				</div>
			</div>
		</Container>
	);
};

export default Login;
