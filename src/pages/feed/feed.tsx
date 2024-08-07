import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds, selectOrders } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const orders = useSelector(selectOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleNewFeeds = () => {
    dispatch(fetchFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleNewFeeds} />;
};
