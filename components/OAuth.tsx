import React from 'react';
import BtnLogin from './BtnLogin';

const OAuth = ({ providers, csrfToken }) => {
	return (
		<div>
			<BtnLogin
				provider={providers.google}
				bgColor='#EA4335'
				csrfToken={csrfToken}
			/>
			<BtnLogin
				provider={providers.facebook}
				bgColor='#3b5998'
				csrfToken={csrfToken}
			/>
			<BtnLogin
				provider={providers.github}
				bgColor='#171515'
				csrfToken={csrfToken}
			/>
		</div>
	);
};

export default OAuth;
