import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: { type: String, default: 'guest' },
		email: { type: String },
		password: { type: String },
		image: {
			type: String,
			default:
				'https://res.cloudinary.com/lobe/image/upload/v1637216604/am86e7svodgtjfowvbfg.png',
		},
		emailVerified: { type: String, default: null },
	},
	{ timestamps: true }
);

let Dataset = mongoose.models.users || mongoose.model('users', userSchema);
export default Dataset;
