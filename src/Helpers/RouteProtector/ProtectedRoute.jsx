import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../App";

export const ProtectedRoute = ({ children, expectedRoles }) => {

  const authContext = useContext(AuthContext);

  if (authContext.userRole === 'Manager' && !expectedRoles.includes('Manager')) {
    return <Navigate to='/manager' replace />;
  }else if(authContext.userRole === 'Admin' && !expectedRoles.includes('Admin')){
    return <Navigate to='/admin' replace />;
  }else if((authContext.userRole === 'Student' || authContext.userRole === 'User' || authContext.userRole === null) && (expectedRoles.includes('Admin') || expectedRoles.includes('Manager'))){
    return <Navigate to='/' replace />;
  }else if((authContext.userRole === null) && !expectedRoles.includes(null)){
    return <Navigate to='/login' replace />;
  }

  return children ? children : <Outlet />;
};