import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as reminderService from '../../services/reminderService';
import styles from './ReminderForm.module.css';

const ReminderForm = (props) => {
    const [formData, setFormData] = useState({
        event: '',
        date: '',
        time: ''
    });
    const { reminderId } = useParams();

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (reminderId) {
            props.handleUpdateReminder(reminderId, formData);
        } else {
            props.handleAddReminder(formData);
        }
    };

    useEffect(() => {
        const fetchReminder = async () => {
            const reminderData = await reminderService.show(reminderId);
            setFormData(reminderData);
        };
        if (reminderId) fetchReminder();
    }, [reminderId]);

    return (
        <main className={styles.reminderform}>
            <form onSubmit={handleSubmit}>
                <h1>{reminderId ? 'Edit Reminder' : 'New Reminder'}</h1>
                <label htmlFor="event-input">Event</label>
                <input
                    required
                    type="event"
                    name="event"
                    id="event-input"
                    value={formData.event}
                    onChange={handleChange}
                />
                <label htmlFor="date-input">Date</label>
                <input
                    type="date"
                    name="date"
                    id="date-input"
                    value={formData.date}
                    onChange={handleChange}
                />
                <label htmlFor="time-input">Time</label>
                <input
                    type="time"
                    name="time"
                    id="time-input"
                    value={formData.time}
                    onChange={handleChange}
                />
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    );
};

export default ReminderForm;