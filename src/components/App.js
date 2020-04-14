import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo, removeTodo } from '../actions/index';
import Record from './Record';
import store from '../index';
import '../App.css'

function App({ todos, dispatch, }) {
    console.log('todos', todos);

    const recs = [
        // {
        //     id: 1,
        //     name: 'Test todo',
        // },
        // {
        //     id: 2,
        //     name: 'Test todo',
        // },
        // {
        //     id: 3,
        //     name: 'Test todo',
        // },
        // {
        //     id: 4,
        //     name: 'Test todo',
        // },
    ]

    let input = useRef('null');
    let parent = useRef('null');

    const [editing, setEditing] = useState(null);
    const [events, setEvents] = useState([]);
    const [recordedTodos, saveRecords] = useState(recs);
    const [playback, setPlayback] = useState([]);
    const [recordings, setRecordings] = useState([]);

    // saveRecords(recs);


    const recordInput = (e) => {
        const { value } = e.target;
        setEvents([...events, { value }]);
    }

    // useEffect(() => {
    //     saveRecords(todos)
    // })

    // const storedEvents = events.map(rec => { setRecordings([...recordings, rec])})


    // const inputRecordings = events && events.reduce((prev, cur, index, array) => {
    //     if (cur.val.length >= 1) {
    //         return prev.concat({ value: cur.val });
    //     }
    //     return prev
    // }, [])

    store.subscribe((x) => {
        console.log(store);
    })


    const processTodos = (recTodos) => {
        console.log('recTodos', recTodos);
        let tempArr = [];
        return recTodos && recTodos.length > 1 && recTodos.map(item => {
            switch (todo.type) {
                case 'ADD_TODO':
                    tempArr.push(item);
                    playEvent(tempArr)
                case 'REMOVE_TODO':
                    tempArr = tempArr.filter(remove => item.id !== remove.id);
                    playEvent(tempArr)
                default:
                    break;
            }
            return tempArr;
        })
    }

    const playEvent = (result) => {
        console.log('result', result);
        let counter = 1000;
        // return result.map(item => {
        setTimeout(() => result, counter = counter + 1000);
        // })
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
            <div onClickCapture={(e) => e ? setEditing(null) : e} ref={parent}>
                <Record events={events} />

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
                        <button onClick={(e) => processTodos(recordedTodos)} >Play todos</button>
                    </div>
                    <div className='item-b'>
                        <p><input type="text" id="text" name="text"></input></p>
                        <ul>
                            {
                                recs && recs.map((recTodo) =>
                                    <li key={recTodo.id}>
                                        {recTodo.name}
                                    </li>
                                )
                            }
                        </ul>
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