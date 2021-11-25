import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { html, text } from '../../../utils/htmlEmail';
import { createTransport } from 'nodemailer';
import connectDB from '../../../config/connectDB';
import User from '../../../models/userModel';
import bcrypt from 'bcrypt';

connectDB();

export default NextAuth({
	session: {
		jwt: true,
	},
	callbacks: {
		session: async (session, user) => {
			session.userId = user.sub;
			return Promise.resolve(session);
		},
	},
	providers: [
		// Credetials authentication provider
		Providers.Credentials({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Your email',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const email = credentials.email;
				const password = credentials.password;

				const user = await User.findOne({ email });
				if (user) return loginUser({ user, password });

				return registerUser({ email, password });
			},
		}),
		// OAuth authentication providers
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		Providers.Facebook({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
		Providers.GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		// Email authentication provider
		Providers.Email({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
			async sendVerificationRequest({
				identifier: email,
				url,
				provider: { server, from },
			}) {
				const { host } = new URL(url);
				const transport = createTransport(server);
				await transport.sendMail({
					to: email,
					from,
					subject: `Sign in to ${host}`,
					text: text({ url, host }),
					html: html({ url, host, email }),
				});
			},
		}),
	],
	pages: {
		signIn: '/login',
		error: '/login',
	},
	// SQL or MongoDB database (or leave empty)
	database: process.env.DATABASE_URL,
});

const loginUser = async ({ user, password }) => {
	if (!user.password) {
		throw new Error('Accounts have to login with OAuth or email');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Password incorrect');
	}

	if (!user.emailVerified) {
		throw new Error('Success! check your email.');
	}

	return user;
};

const registerUser = async ({ email, password }) => {
	const hashPass = await bcrypt.hash(password, 12);
	const newUser = new User({ email, password: hashPass });
	await newUser.save();
	throw new Error('Success! check your email.');
};
