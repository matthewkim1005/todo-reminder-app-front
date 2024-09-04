import { Link } from 'react-router-dom';
import styles from './ReminderList.module.css';

const ReminderList = (props) => {
    return (
        <main>
            <div className={styles.center}>
                <Link className={styles.addReminder} to="/reminders/new">NEW Reminder</Link>
            </div>
            <div className={styles.container}>
                <ul>
                    {props.reminders.map((reminder) => (
                        <li key={reminder._id}>
                            <article>
                                <header>
                                    <h2>{reminder.event}</h2>
                                </header>
                                {reminder.date ?
                                    <p>{new Date(reminder.date).toLocaleDateString()} </p>
                                    : ''}
                                <p>{reminder.time}</p>
                                <button onClick={() => props.handleDeleteReminder(reminder._id)}>Delete</button>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default ReminderList;