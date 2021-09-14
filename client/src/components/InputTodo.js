import React, { Fragment, useState } from 'react';

export default function InputTodo() {

    const [description, setDescription] = useState('');

    const onSubmitForm = async e => {
        e.preventDefault(); 
        try {
            const body = { description };
            const res = await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body) 
            });
            console.log(res);
            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">
                PERN Todo List
            </h1>
            <form 
            className="d-flex mt-5"
            onSubmit={(e) => onSubmitForm(e)}>
                <input 
                className="form-control"
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <button
                className="btn btn-success">
                    Add
                </button>
            </form>
        </Fragment>
    );
}
