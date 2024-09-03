import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useContext, useEffect } from 'react';
import styles from './NavBar.module.css';

import * as reminderService from '../../services/reminderService';
import ReminderList from '../ReminderList/ReminderList';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const [reminders, setReminders] = useState([]);

  //reminders
  const handleAddReminder = async (reminderFormData) => {
    const newReminder = await reminderService.create(reminderFormData);
    setReminders([newReminder, ...reminders]);
    navigate('/reminders');
  };

  const handleDeleteReminder = async (reminderId) => {
    const deletedReminder = await reminderService.deleteReminder(reminderId);
    setReminders(reminders.filter((reminder) => reminder._id !== deletedReminder._id));
    navigate('/reminders');
  };

  useEffect(() => {
    const fetchAllReminders = async () => {
      const remindersData = await reminderService.index();
      setReminders(remindersData);
    };
    if (user) fetchAllReminders();
  }, [user]);

  return (
    <>
      {user ? (
        <nav className={styles.container}>
          <ul className={styles.left}>
            <li className={styles.left}><Link to='/'>HOME</Link></li>
            <li className={styles.left}><Link to='/todos/myTodos'>MY TODOS</Link></li>
            <li className={styles.left}><Link to='/todos'>ALL TODOS</Link></li>
            <li className={styles.left}><Link to='' onClick={handleSignout}>SIGN OUT</Link></li>
          </ul>
          <ul className={styles.right}>
            <div className={styles.dropdown}>
              <span>REMINDERS</span>
              <li className={styles.reminderList}>
                <ReminderList reminders={reminders} handleDeleteReminder={handleDeleteReminder} handleAddReminder={handleAddReminder} />
              </li>
            </div>
          </ul>
        </nav>
      ) : (
        <nav className={styles.container}>
          <ul className={styles.center}>
            <li className={styles.left}>
              <Link to="/signin">Sign In</Link>
            </li>
            <li className={styles.left}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;