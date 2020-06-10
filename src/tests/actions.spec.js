import React from 'react';
import Todo from '../components/Todo';
import renderer from 'react-test-renderer';
import * as actions from '../actions/index';


describe('ADD_TODO action', () => {
    it('Should create a TODO,', () => {
        const payload = {
            id: 1, name: 'Nabs Writes Tests',
            type: '_ADD_TODO',
            creationDate: new Date(365 * 24 * 60 * 60 * 1000).toUTCString(),
            completed: false,
            isRecording: false
        };
        const expectedAction = {
            type: '_ADD_TODO',
            payload
        };

        expect(actions.addTodo(payload)).toEqual(expectedAction)
    })
});

describe('REMOVE TODO action', () => {
    it('It should remove a todo', () => {
        const isRecording = false;

        const expectedAction = {
            id: 1,
            isRecording,
            type: '_REMOVE_TODO'
        }

        expect(actions.removeTodo(1, isRecording)).toEqual(expectedAction);
    })
})


// test('Todo Component Renders', () => {
//     const component = renderer.create(
//         <Todo></Todo>
//   ,);

//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();

//     tree.props.onMouseEnter();

//     tree = component.toJSON();
//     expect(tree).toMatchSnapshot();

//     tree.props().onMouseLeave();
//     tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });