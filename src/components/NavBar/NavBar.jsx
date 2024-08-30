import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import styles from './NavBar.module.css';
import ReminderList from '../ReminderList/ReminderList';
import ReminderForm from '../ReminderForm/ReminderForm';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <>
      {user ? (
        <nav className={styles.container}>
          <ul className={styles.left}>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/todos'>TODOS</Link></li>
            <li><Link to='' onClick={handleSignout}>SIGN OUT</Link></li>
          </ul>
          <ul className={styles.right}>
            <li><Link to='/reminders'>REMINDERS</Link></li>
          </ul>
        </nav>
      ) : (
        <nav className={styles.container}>
          <ul className={styles.center}>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;