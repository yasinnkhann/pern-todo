import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

export default function ListTodos() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {

        const getTodos = async () => {

            try {
                const res = await fetch('http://localhost:5000/todos');
                const data = await res.json();
                console.log(data);
                setTodos(data);
            } catch (err) {
                console.error(err.message);
            }
        }
        getTodos();
    }, [])

    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            }); 
            console.log(deleteTodo);
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>

                {/* <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr> */}
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>{<EditTodo todo={todo} />}</td>
                        <td>
                            <button 
                            className="btn btn-danger"
                            onClick={() => deleteTodo(todo.todo_id)}
                            >
                                Delete
                            </button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Fragment>
    );
}
