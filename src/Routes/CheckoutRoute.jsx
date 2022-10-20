import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckoutRoute = ({children}) => {
 
  const { data } = useSelector((state) => state.auth );

  if (!data) {
    return <Navigate to="/login" />;
  }
 

 return <Outlet/>;
};

export default CheckoutRoute;
