import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const isLogged = useSelector(state => state.login.isLogged);

    return (
        isLogged ? children : <Navigate to="/login" />
    )
  }
  
  export default PrivateRoute;