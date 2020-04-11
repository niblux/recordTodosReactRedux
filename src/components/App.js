import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo, removeTodo } from '../actions/index';

function App({ todos, dispatch }) {
    let input = React.createRef();

    const [editing, setEditing] = useState(null);

    // add
    const add = (e) => {
        const { name, value } = e.target;
        if (e && e.key === 'Enter') {
            dispatch(addTodo({ [name]: value }));
        }
    }

    // delete
    const remove = (e, id) => console.log('>> delete', id, e) || dispatch(removeTodo(id));

    // set input to edit mode 
    const edit = (e, id) => {
        setEditing(id);
    }

    // update 
    const handleChange = (e, todo) => {
        const { value } = e.target;
        if (e.key === 'Enter') {
            dispatch(updateTodo(todo.id, value));
            setEditing(null);
        }
    };

    return (
        <ul>
            <input onKeyPress={add} ref={input} type="text" id="text" name="text"></input>

            <br />
            <br />
            <br />
            <br />

            {
                todos && todos.map((todo, index) => editing && editing === todo.id ?
                    <input onKeyPress={e => handleChange(e, todo, index)} key={todo.id} defaultValue={todo.text} type="text" id="text" name="text" />
                    :
                    <>
                        <li onClick={(e) => edit(e, todo.id)} key={todo.id}>{todo.text}
                            <button onClick={(e) => remove(e, todo.id)}>X</button>
                        </li>
                    </>
                )
            }
        </ul>
    )
};

const mapStateToProps = state => {
    return { todos: state.todos }
};

export default connect(mapStateToProps)(App);