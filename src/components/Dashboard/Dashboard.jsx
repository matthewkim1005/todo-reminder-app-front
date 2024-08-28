import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({ }) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        See your todos and reminders!
        <li><Link to="/todos/new">NEW TODO</Link></li>
        <li><Link to="/reminders/new">NEW REMINDER</Link></li>
      </p>
    </main>
  );
};

export default Dashboard;
