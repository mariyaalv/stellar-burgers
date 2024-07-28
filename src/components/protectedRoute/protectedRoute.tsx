import { selectUser } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  disallowIfAuthed?: boolean;
  children: React.ReactNode;
};

export function ProtectedRoute({
  children,
  disallowIfAuthed
}: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isAuth } = useSelector(selectUser);

  if (!isAuth) {
    return <Preloader />;
  }

  //Редирект на целевой компонент
  if (disallowIfAuthed && user) {
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
  }
  //Редирект на страницу логина при отсутствии пользователя в сторе
  if (!disallowIfAuthed && !user) {
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }
  return children;
}
