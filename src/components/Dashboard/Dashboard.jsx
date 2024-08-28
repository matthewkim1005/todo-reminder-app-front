import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import styles from './Dashboard.module.css';

const Dashboard = ({ }) => {
  const user = useContext(AuthedUserContext);
  return (
    <main className={styles.dashboard}>
      <div>
        <h1>Welcome, {user.username}</h1>
        <ul>
          Add a todo or reminder!
          <li><Link to="/todos/new">NEW TODO</Link></li>
          <li><Link to="/reminders/new">NEW REMINDER</Link></li>
        </ul>
      </div>
    </main>
  );
};

export default Dashboard;
