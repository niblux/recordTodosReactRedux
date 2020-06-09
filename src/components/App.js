import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  addTodo, updateTodo, removeTodo, startRecording, stopRecording, clearRecordings, clearTodos, completeTodo,
} from "../actions/index";
import "../App.css";
import Todo from "./Todo";

function App({ todos, dispatch, recordingState, recordings }) {

  let nameInput = useRef("null");
  let toggle = false;

  const [editing, setEditing] = useState({});
  const [events, setEvents] = useState([]);
  const [inputPlayback, setInputPlayback] = useState([]);
  const [completed, setComplete] = useState(toggle);
  const [recording, setRecording] = useState(toggle);

  /* handle input playback */

  const recordInput = (e) => {
    const { value } = e.target;
    setEvents([...events, { value }]);
  };

  const processedInput = events && events.reduce((prev, cur) => {
    if (cur.value.length >= 1) {
      return prev.concat(cur.value);
    }
    return prev
  }, [])

  const playbackInput = (result) => {
    let counter = 1000;
    return result.map(item => {
      setTimeout(() => {
        setInputPlayback([...inputPlayback, item])
        nameInput.current.value = item;
      }, counter = counter + 1000);
      setEvents([])
    })
  }

  /**
   *
   * 1. type input
   * 2. input is stored
   * 3. loop through recorded items 
   * 4. check if add_todo
   * 5. playback input
   */

  /* ----- */

  /* TODOS CRUD  */

  const add = (e) => {
    if (e.target.value == "") return;
    const { name, value } = e.target;

    if (e && e.key === "Enter") {
      // check if were recording
      recordingState ? dispatch(addTodo({ [name]: value, type: "_ADD_TODO", isRecording: true }))
        : dispatch(addTodo({ [name]: value, type: "_ADD_TODO", isRecording: false }));
      nameInput.current.value = "";
    }
  };

  const remove = (e, id) => {
    recordingState
      ? dispatch(removeTodo(id, true))
      : dispatch(removeTodo(id, false));
  };

  const edit = (e, id) => {
    setEditing(id);
  };

  const update = (e, todo) => {
    const { value } = e.target;
    if (e.key === "Enter") {
      recordingState
        ? dispatch(updateTodo(todo.id, value, true))
        : dispatch(updateTodo(todo.id, value, false));
      setEditing({});
    }
  };

  const checkTodo = (e, todo) => {
    console.log('e', e.target);
    console.log('todo', todo);
    !todo.completed ? setComplete(false) : setComplete(true);
    dispatch(completeTodo(todo));
  }


  /* Recording and Playback of TODOS CRUD  */

  const filterRecorded = () => {
    return recordings.filter((todo) => todo.isRecording);
    // return recordings.sort((x, y) => y.creationDate - x.creationDate);
  };


  const play = (recordedTodos) => {
    // clear todos in prepration of recording playback. 
    dispatch(clearTodos());

    const sorted = recordedTodos.sort((x, y) => {
      return x.creationDate - y.creationDate;
    });

    let counter = 1000;

    // const starterPromise = Promise.resolve(null);
    // const log = result => console.log(result);
    // await asyncThingsToDo.reduce(
    //   (p, spec) => p.then(() => runTask(spec).then(log)),
    //   starterPromise
    // );

    // // const addingTodos = sorted.filter(todo => todo.type = '_ADD_TODO');
    // const todosAdding = new Promise((resolve, reject) => {
    //   sorted.map(todo => {
    //     if (todo.type === '_ADD_TODO') {
    //       resolve('resolved cos i found ');
    //     }
    //   })
    // })

    // todosAdding.then((res) => {
    //   console.log('result from promise', res);
    // })

  };

  const record = () => {
    dispatch(startRecording(true));
    setRecording(true);
  }

  const stop = () => {
    dispatch(stopRecording(false));
    setRecording(false);
  }

  const clear = () => {
    dispatch(clearRecordings());
  };

  /* ----- */


  return (
    <>
      <div className="main-container">
        <header className="side-header">Menu</header>

        <div className="sub-header">
          <h1>Todo List</h1>
          <button className={`${recording ? 'Rec' : 'notRec'}`}>Recording</button>
        </div>

        <div className="todo-container">
          <div className="list-items">
            <p>
              <input className="nameInput" ref={nameInput} onChange={(e) => recordInput(e)} onKeyPress={add} type="text" name="name"></input>
            </p>
            <ul>
              {/* todo items go here */}
              <Todo todos={todos} checkTodo={checkTodo} update={update} remove={remove} edit={edit} editing={editing} completed={completed} />
            </ul>
          </div>

          <div className="action-buttons">
            <button className="mainControls" onClick={record}>Record</button>
            <button className="mainControls" onClick={clear}>Clear</button>
            <button className="mainControls" onClick={stop}>Stop</button>
            <button className="mainControls" onClick={(e) => play(filterRecorded())}>Play</button>
          </div>
        </div>
        {/* <div className="item-b">
            DEBUGGING PLAYBACK
            <ul>
              {inputPlayback &&
                inputPlayback.map((recs, index) => <p key={index}>
                  {console.log('recs', recs)}
                  {recs}
                </p>)}
            </ul>
          </div> */}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    recordingState: state.recordingState,
    recordings: state.saveRecordings,
  };
};

export default connect(mapStateToProps)(App);
