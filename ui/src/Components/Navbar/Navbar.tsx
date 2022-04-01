import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import * as AUTH_ACTIONS from '../../store/actions/auth.actions';

interface NavbarProps {
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    console.log('logout from navigate');
    // navigate('/login');
    dispatch(AUTH_ACTIONS.logout());
  };

  console.log('user : ', user);

  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Project Satellite
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img src={user.profilePicture} alt="" className="avatar" />
          </li>
          <li className="listItem">{user.email}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
