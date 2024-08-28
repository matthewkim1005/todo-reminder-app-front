import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
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
        setTodo({ ...todo, comments: [...todo.comments, newComment] });
    };

    // console.log('todo state:', todo);

    if (!todo) return <main>Loading...</main>;

    return (
        <main>
            <header>
                <h1>{todo.task}</h1>
                <p>{todo.creator.username}'s Todo List Details</p>
                <p>{todo.details}</p>
                {todo.creator._id === user._id && (
                    <>
                        <Link to={`/todos/${todoId}/edit`}>Edit</Link>

                        <button onClick={() => props.handleDeleteTodo(todoId)}>Delete</button>
                    </>
                )}
            </header>
            <section>
                <h2>Comments</h2>
                {!todo.comments.length && <p>There are no comments.</p>}
                <CommentForm handleAddComment={handleAddComment} />
                {todo.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>
                                {comment.commentor.username} posted on
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                        </header>
                        <p>{comment.details}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default TodoDetails;