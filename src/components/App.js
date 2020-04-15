import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo, removeTodo } from '../actions/index';
import Record from './Record';
import '../App.css'

function App({ todos, dispatch, }) {

    let input = useRef('null');
    let parent = useRef('null');

    const [editing, setEditing] = useState(null);
    const [events, setEvents] = useState([]);

    const recordInput = (e) => {
        const { value } = e.target;
        setEvents([...events, value]);
    }

    // add
    const add = (e) => {
        if (e.target.value == '') {
            return
        }
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
            <div>
                <div className="container">

                    <div className="item-a">
                        <p><input ref={input} onChange={(e) => recordInput(e)} onKeyPress={add} type="text" id="text" name="text"></input></p>
                        <ul>
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
                    </div>

                    <div className="item-b">
                        <Record events={events} />

                    </div>

                </div>

            </div>
        </>
    )
};

const mapStateToProps = state => {
    return { todos: state.todos }
};

export default connect(mapStateToProps)(App);