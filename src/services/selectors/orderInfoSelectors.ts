import { RootState } from '../store';

export const ordersInfoSelector =
  (orderNumber: string) => (state: RootState) => {
    if (state.userOrders.orders.length) {
      const data = state.userOrders.orders.find(
        (order) => order.number === +orderNumber
      );
      if (data) return data;
    }

    if (state.feed.orders.length) {
      const data = state.feed.orders.find(
        (order) => order.number === +orderNumber
      );
      if (data) return data;
    }

    if (state.order.orderInfo?.number === +orderNumber) {
      return state.order.orderInfo;
    }

    return null;
  };
