import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/todos'>TODOS</Link></li>
            <li><Link to="/todos/new">NEW TODO</Link></li>
            <li><Link to='/reminder'>REMINDERS</Link></li>
            <li><Link to="/reminders/new">NEW REMINDER</Link></li>
            <li><Link to='' onClick={handleSignout}>SIGN OUT</Link></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
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