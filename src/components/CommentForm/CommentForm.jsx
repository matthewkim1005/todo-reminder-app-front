import { useState, useEffect } from 'react';
import * as todoService from '../../services/todoService';

const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddComment(formData);
        setFormData({ text: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input">Comment:</label>
            <textarea
                required
                type="text"
                name="text"
                id="text-input"
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit">SUBMIT COMMENT</button>
        </form>
    );
};

export default CommentForm;