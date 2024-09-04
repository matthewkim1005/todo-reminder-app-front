import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import styles from './TodoDetails.module.css';
import * as todoService from '../../services/todoService';
import CommentForm from '../CommentForm/CommentForm.jsx';

const TodoDetails = (props) => {
    const [todo, setTodo] = useState(null);
    const user = useContext(AuthedUserContext);
    const { todoId } = useParams();
    console.log('todoId', todoId);

    useEffect(() => {
        const fetchTodo = async () => {
            const todoData = await todoService.show(todoId);
            console.log('todoData', todoData);
            setTodo(todoData);
        };
        fetchTodo();
    }, [todoId]);

    const handleAddComment = async (commentFormData) => {
        const newComment = await todoService.createComment(todoId, commentFormData);
        const updatedTodos = props.todos.map((todo) => (
            todo._id === newComment._id ? newComment : todo
        )
        )
        props.setTodos(updatedTodos)
        setTodo({ ...todo, comments: [...todo.comments, newComment] });
    };

    // console.log('todo state:', todo);

    if (!todo) return <main>Loading...</main>;

    return (
        <main className={styles.container}>
            <header>
                <div>
                    <h1 className={styles.underline}>{todo.task}</h1>
                    <p className={styles.underline}>{todo.creator.username}'s Todo List</p>
                    <p>{todo.details}</p>
                </div>
                {todo.creator._id === user._id && (
                    <>
                        <Link className={styles.underline} to={`/todos/${todoId}/edit`}>Edit</Link>

                        <button onClick={() => props.handleDeleteTodo(todoId)}>Delete</button>
                    </>
                )}
            </header>
            <section>
                <h2>Comments</h2>
                {!todo.comments.length && <p>There are no comments.</p>}
                <CommentForm handleAddComment={handleAddComment} />
                {todo.comments.map((comment) => (
                    <article className={styles.comment} key={comment._id}>
                        <header>
                            <p className={styles.underline}>
                                {comment.commentor.username} posted on {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                        </header>
                        <p>{comment.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default TodoDetails;