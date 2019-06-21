export default function todos(state=[], actions) {
    switch (actions.type) {
        case 'ADD_TODO': {
            return [ ...state, { id: Math.random(), text: actions.payload.text } ];
        }
        case 'REMOVE_TODO': {
            return state.filter(todo => todo.id !== actions.payload.id);
        }
        case 'COMPLETE_TODO': {
            return state.map(todo => (todo.id === actions.payload.id)? { ...todo, completed: !todo.completed } : todo);
        }
        default:
            return state;
    }
}