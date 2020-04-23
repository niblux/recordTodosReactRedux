import React from 'react';
import { useState } from 'react';

function Todo({ todos, remove, update, edit, editing, completed }) {

    return (
        <>
            {todos &&
                todos.map((todo, index) =>
                    editing && editing === todo.id ? (
                        <input className="nameInput" onKeyPress={(e) => update(e, todo, index)} key={todo.id} defaultValue={todo.name} type="text" id="name" name="name" />
                    ) : (
                            <>
                                <li className={`${completed ? 'completed' : ''}`} onClick={(e) => edit(e, todo.id)} key={todo.id}>
                                    {todo.name}
                                </li>
                                <div className="actions">
                                    <button onClick={(e) => remove(e, todo.id)}>X</button>
                                    <button className="check" value={completed} onClick={(e) => checkTodo(e, todo)} >/-</button>
                                </div>

                            </>
                        )
                )}
        </>
    )
};

export default Todo;