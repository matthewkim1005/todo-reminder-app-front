import { Link } from 'react-router-dom';
import styles from './TodoList.module.css';

const TodoList = (props) => {
    return (
        <main>
            <div className={styles.center}>
                <Link className={styles.addTodo} to="/todos/new">NEW TODO</Link>
            </div>
            <div className={styles.container}>
                {props.todos.map((todo) => (
                    <Link key={todo._id} to={`/todos/${todo._id}`}>
                        <article>
                            <header>
                                <h2>{todo.task}</h2>
                                <p>
                                    {todo.creator.username}
                                </p>
                            </header>
                            <p>{todo.details}</p>
                        </article>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default TodoList;