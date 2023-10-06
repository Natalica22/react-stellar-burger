import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_PAGE } from "../../utils/pages";
import PropTypes from "prop-types";

const Protected = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={LOGIN_PAGE} state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);

Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.node.isRequired
}

OnlyUnAuth.propTypes = {
  component: PropTypes.node.isRequired
}