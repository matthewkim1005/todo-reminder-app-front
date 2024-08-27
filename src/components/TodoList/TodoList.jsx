import { Link } from 'react-router-dom';

const TodoList = (props) => {
    return (
        <main>
            {props.todos.map((todo) => (
                <Link key={todo._id} to={`/todos/${todo._id}`}>
                    <article>
                        <header>
                            <h2>{todo.task}</h2>
                            <p>
                                {todo.commentor} posted on 
                                {new Date(todo.createdAt).toLocaleDateString()}
                            </p>
                        </header>
                        <p>{todo.details}</p>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default TodoList;