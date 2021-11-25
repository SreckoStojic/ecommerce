import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../reducers';

function PrivateRoute({children} : PropsWithChildren<unknown>) {
    const isLogged : string | boolean = useSelector((state : RootState) => state.login.isLogged);

    return (
        isLogged ? children : <Navigate to="/login" />
    )
  }
  
  export default PrivateRoute;