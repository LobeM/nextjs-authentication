import React, { useState } from 'react';
import BtnLogin from './BtnLogin';

const EmailAuth = ({ providers, csrfToken }) => {
	const [email, setEmail] = useState('');

	return (
		<BtnLogin
			provider={providers.email}
			bgColor='#22b50b'
			csrfToken={csrfToken}
			options={{ email }}
		>
			<div>
				<label htmlFor='email'>Email address</label>
				<input
					type='email'
					id='email'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='form-control w-100'
					placeholder='email@example.com'
					required
				/>
			</div>
		</BtnLogin>
	);
};

export default EmailAuth;
