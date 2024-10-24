import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
	const data = localStorage.getItem('todos');
	return data ? JSON.parse(data) : [];
}

export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify( todos ))
	}, [ todos ]);

    const onNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] add todo',
            payload: todo
        }
        dispatch( action );
    }

	const onDeleteTodo = (id) => {
		dispatch({
			type: '[TODO] remove todo',
			payload: id
		})
	}

	const onToggleTodo = (id) => {
		dispatch({
			type: '[TODO] toggle todo',
			payload: id
		})
	}

    return{
        todos,
        todosCount: todos.length,
        pedingTodosCount : todos.filter(todo => !todo.done).length,
        onNewTodo,
        onDeleteTodo,
        onToggleTodo
    }
}