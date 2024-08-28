import { useState, useEffect } from 'react';
import * as todoService from '../../services/todoService';

const CommentForm = (props) => {
    const [formData, setFormData] = useState({ details: '' });

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddComment(formData);
        setFormData({ details: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="details-input">Comment:</label>
            <textarea
                required
                type="details"
                name="details"
                id="details-input"
                value={formData.details}
                onChange={handleChange}
            />
            <button type="submit">SUBMIT COMMENT</button>
        </form>
    );
};

export default CommentForm;