import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo, removeTodo } from '../actions/index';
import Record from './Record';

function App({ todos, dispatch }) {
    let input = useRef('null');

    const [editing, setEditing] = useState(null);
    const [events, setEvents] = useState([]);

    const actionLog = [];

    const recordState = (e) => {
        const { value } = e.target;
        console.log('value', value);
        setEvents([...events, { val: value, time: Date.now() }]);
        console.log('events', events);
    }

    // add
    const add = (e) => {
        const { name, value } = e.target;
        if (e && e.key === 'Enter') {
            dispatch(addTodo({ [name]: value }));
            input.current.value = '';
        }
    }

    // delete
    const remove = (e, id) => dispatch(removeTodo(id));

    // set input to edit mode 
    const edit = (e, id) => {
        setEditing(id);
    }

    // update 
    const update = (e, todo) => {
        const { value } = e.target;
        if (e.key === 'Enter') {
            dispatch(updateTodo(todo.id, value));
            setEditing(null);
        }
    };

    return (
        <>
            <Record events={events} />
            <ul>
                <input ref={input} onChange={(e) => recordState(e)} onKeyPress={add} type="text" id="text" name="text"></input>

                <br />
                <br />
                <br />
                <br />

                {
                    todos && todos.map((todo, index) => editing && editing === todo.id ?
                        <input onKeyPress={e => update(e, todo, index)} key={todo.id} defaultValue={todo.text} type="text" id="text" name="text" />
                        :
                        <>
                            <li onClick={(e) => edit(e, todo.id)} key={todo.id}>{todo.text}
                                <button onClick={(e) => remove(e, todo.id)}>X</button>
                            </li>
                        </>
                    )
                }
            </ul>
        </>
    )
};

const mapStateToProps = state => {
    return { todos: state.todos }
};

export default connect(mapStateToProps)(App);