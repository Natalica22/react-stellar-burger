import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_PAGE } from "../../utils/pages";
import { RootState } from "../../utils/types";
import { ReactElement } from "react";

type Props = {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

const Protected = ({ onlyUnAuth = false, component }: Props) => {
  const isAuthChecked = useSelector((store: RootState) => store.user.isAuthChecked);
  const user = useSelector((store: RootState) => store.user.user);
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
export const OnlyUnAuth = ({ component }: Props) => (
    <Protected onlyUnAuth={true} component={component} />
)