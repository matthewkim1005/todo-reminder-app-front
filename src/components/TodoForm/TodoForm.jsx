import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as todoService from '../../services/todoService';
import styles from './TodoForm.module.css';

const TodoForm = (props) => {
    const [formData, setFormData] = useState({
        task: '',
        details: ''
    });
    const { todoId } = useParams();

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (todoId) {
          props.handleUpdateTodo(todoId, formData);
        } else {
          props.handleAddTodo(formData);
        }
      };

    useEffect(() => {
        const fetchTodo = async () => {
            const todoData = await todoService.show(todoId);
            setFormData(todoData);
        };
        if (todoId) fetchTodo();
    }, [todoId]);

    return (
        <main className={styles.todoform}>
            <form onSubmit={handleSubmit}>
                <h1>{todoId ? 'Edit Todo' : 'New Todo'}</h1>
                <label htmlFor="task-input">Task</label>
                <input
                    required
                    type="task"
                    name="task"
                    id="task-input"
                    value={formData.task}
                    onChange={handleChange}
                />
                <label htmlFor="details-input">Details</label>
                <textarea
                    required
                    type="details"
                    name="details"
                    id="details-input"
                    value={formData.details}
                    onChange={handleChange}
                />
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    );
};

export default TodoForm;