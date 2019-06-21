import React from "react";
import { shallow } from "enzyme";
import configureStore from 'redux-mock-store';

import * as actions from '../../src/store/actions';

import { Text, Button } from 'react-native';

import TodoList from '../../src/todoList';

const mockStore = configureStore([]);

const initialState = {
    todos: [
        { id: 1, text: 'First Text Test'},
        { id: 2, text: 'Second Text Test'},
        { id: 3, text: 'Third Text Test'},
    ],
};

describe('Testing todoList', () => {
    const store = mockStore(initialState);

    function createWrapper() {
        return shallow(<TodoList store={store} />).dive();
    };
    
    it('render as expected', () => {
        const wrapper = createWrapper();

        expect(wrapper.prop('todos')).toEqual(initialState.todos);
        expect(wrapper.dive().find(Text)).toHaveLength(initialState.todos.length);
    });

    it('can add new todo', () => {
        const wrapper = createWrapper();

        wrapper.dive().find(Button).simulate('press');

        expect(store.getActions()).toContainEqual(actions.addTodo());
    });
});