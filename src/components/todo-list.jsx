import { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from './todo';
const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const URI = import.meta.env.VITE_API_UR;
    // console.log(URI)
    useEffect(() => {
        axios.get(`${URI}/todos`).then((response) => {
            setTodos(response.data);
        });
    }, []);

    const addTodo = () => {
        axios.post(`${URI}/todos`, { title }).then((response) => {
            setTodos([...todos, response.data]);
            setTitle('');
        });
    };

    const updateTodo = (id, completed) => {
        axios.put(`${URI}/todos/${id}`, { completed }).then((response) => {
            setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
        });
    };

    const deleteTodo = (id) => {
        axios.delete(`${URI}/todos/${id}`).then(() => {
            setTodos(todos.filter((todo) => todo._id !== id));
        });
    };

    return (
        <>

            <div className=' w-full text-center mb-10'>
                <h1 className='font-bold text-3xl'>Todo List</h1>
            </div>
            <div className='h-[65vh] w-full flex flex-col justify-center items-center '>
                <div className='w-3/4 sm:w-1/2 flex p-2 float-start '>
                    <input
                        className='bg-slate-100 flex-auto  '
                        type="text"
                        value={title}
                        placeholder='Enter your task '
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button onClick={addTodo} className='bg-slate-800 text-white px-2 py-2 ml-2 rounded-lg'>Add Todo</button>
                </div>
                <h3 className='font-semibold underline m-1'> My todos</h3>
                <div className='w-3/4 sm:w-1/2 my-4 overflow-x-auto'>
                    {todos.map((todo) => (
                        <Todo
                            key={todo._id}
                            todo={todo}
                            onUpdate={updateTodo}
                            onDelete={deleteTodo}
                        />
                    ))}
                </div>
            </div>
        </>

    );
};

export default TodoList;
