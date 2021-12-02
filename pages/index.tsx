import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getSession } from 'next-auth/client';
import { NextPageContext } from 'next';
import MyNavbar from '../components/MyNavbar';
import TodoInput from '../components/TodoInput';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
import { toast } from 'react-toastify';

export const getServerSideProps = async (context: NextPageContext) => {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {
			session: session,
		},
	};
};

const Index = ({ session }) => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchTodos = async () => {
			setLoading(true);
			try {
				const res = await axios.get('/api/todo');
				if (res.status === 200) {
					setTodos(res.data);
					toast.success(res.data.msg);
				} else {
					toast.error(res.data.msg);
				}
			} catch (err) {
				console.log(err);
				toast.error(err.response.data.msg);
			}

			setLoading(false);
		};
		fetchTodos();
	}, []);

	return (
		<div>
			<Container>
				<MyNavbar />
				<main>
					<TodoInput />
					<div>
						{todos.map((todo) => (
							<TodoItem key={todo._id} todo={todo} />
						))}
					</div>
					{loading && <h2>Loading...</h2>}
				</main>
			</Container>
		</div>
	);
};

export default Index;
