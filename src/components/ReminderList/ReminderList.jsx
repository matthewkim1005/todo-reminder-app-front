import { Link } from 'react-router-dom';
import styles from './ReminderList.module.css';

const ReminderList = (props) => {

    return (
        <main className={styles.container}>
            <div className={styles.addReminder}>
                <Link to="/reminders/new">NEW Reminder</Link>
            </div>
            <div className={styles.center}>
                {props.reminders.map((reminder) => (
                    <Link key={reminder._id} to={`/reminders/${reminder._id}`}>
                        <article>
                            <header>
                                <h2>{reminder.event}</h2>
                            </header>
                            {reminder.date ?
                                <p>{reminder.date}</p>
                                : ''}
                            <p>{reminder.time}</p>
                            <button onClick={() => props.handleDeleteReminder(reminder._id)}>Delete</button>
                        </article>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default ReminderList;