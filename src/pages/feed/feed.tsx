import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds, selectOrders } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrders);

  const dispatch = useDispatch();

  const handleGetFeeds = useCallback(() => dispatch(fetchFeeds()), [dispatch]);

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  // const handleGetFeeds = () => {
  //   console.log('click');
  //   dispatch(fetchFeeds());
  // };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
