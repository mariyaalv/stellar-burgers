import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { userLogout } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
