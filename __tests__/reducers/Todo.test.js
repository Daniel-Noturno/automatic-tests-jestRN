import todoReducer from '../../src/store/reducers';
import * as actions from '../../src/store/actions';

const todos = [
    { id: 1, text: 'New toDo' },
    { id: 2, text: 'Other toDo', completed: true},
];

describe('Testing todo reducer', () => {
    it('can add new todo', () => {
        const state = todoReducer([], actions.addTodo('Fazer Café do Brabo'));

        expect(state).toHaveLength(1);
        expect(state[0].text).toBe('Fazer Café do Brabo');
    });
    it('can remove todo', () => {
        const state = todoReducer(todos, actions.removeTodo(1));

        expect(state).toHaveLength(1);
        expect(state).not.toContainEqual(todos[0]);
    });
    it('can mark as complete todo', () => {
        let state = todoReducer(todos, actions.completeTodo(1));

        expect(state[0].completed).toBe(true);

        state = todoReducer(state, actions.completeTodo(1));

        expect(state[0].completed).toBe(false);
    });
}); 