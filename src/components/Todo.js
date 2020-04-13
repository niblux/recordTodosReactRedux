import React from 'react';
import { useState } from 'react';

function Todo(props) {

    let text = React.createRef();

    let initItems = { id: 0, text: '' };

    const [todos, setTodos] = useState(initItems)

    const handleChange = e => {
        const { name, value } = e.target;
        setTodos({ ...todos, [name]: value });
    };

    return (
        <div>
            <form onSubmit={(e) => props.addTodos(e, items)}>
                <div className="form-group">
                    <label htmlFor="todo">text</label>
                    <input onChange={handleChange} type="text" className="form-control" ref={text} id="text" name="text" />
                    <button className="btn btn-info mt-2">Add</button>
                </div>
            </form>
        </div>
    )
};

export default Todo;