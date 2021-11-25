import connectDB from '../../../config/connectDB';
import Todos from '../../../models/todoModel';
import { getSession } from 'next-auth/client';
import { Request, Response } from 'express';

connectDB();

const createTodo = async (req: Request, res: Response) => {
	try {
		const session = await getSession({ req });
		console.log({ session, todo: req.body.todo });
		if (!session) {
			return res.status(400).json({ msg: 'Invalid Authentication!' });
		}
		const { userId } = session;
		const { todo } = req.body;

		if (!todo) return res.status(400).json({ msg: 'Please add todo' });

		const newTodo = new Todos({
			name: todo.toLowerCase(),
			user: userId,
		});

		await newTodo.save();
		res.status(200).json({ msg: 'Success! Create a new todo.' });
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

const getTodos = async (req: Request, res: Response) => {
	try {
		const session = await getSession({ req });
		console.log({ session, todo: req.body.todo });
		if (!session) {
			return res.status(400).json({ msg: 'Invalid Authentication!' });
		}
		const { userId } = session;

		const todos = await Todos.find({ user: userId });

		res.status(200).json(todos);
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

export default async function handler(req: Request, res: Response) {
	switch (req.method) {
		case 'POST':
			await createTodo(req, res);
			break;
		case 'GET':
			await getTodos(req, res);
			break;
	}
}
