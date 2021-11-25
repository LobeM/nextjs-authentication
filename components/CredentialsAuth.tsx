import React, { useState } from 'react';
import BtnLogin from './BtnLogin';

const CredentialsAuth = ({ providers, csrfToken }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<BtnLogin
			provider={providers.credentials}
			bgColor='gray'
			csrfToken={csrfToken}
			options={{ redirect: false, email, password }}
		>
			<div className='mb-3'>
				<label>Email address</label>
				<input
					type='email'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='form-control w-100'
					placeholder='email@example.com'
					required
				/>
			</div>
			<div>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					name='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='form-control w-100'
					required
				/>
			</div>
		</BtnLogin>
	);
};

export default CredentialsAuth;
