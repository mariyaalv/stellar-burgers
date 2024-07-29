import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  resetConstructor,
  selectBunConstructor,
  selectIngredientsConstructor
} from '../../services/slices/burgerConstructorSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  createOrder,
  selectOrderInfo,
  selectOrderRequest
} from '../../services/slices/orderSlice';
import { selectUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const bun = useSelector(selectBunConstructor);
  const ingredients = useSelector(selectIngredientsConstructor);
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderInfo);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    }
    const ingredient = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    const order = [constructorItems?.bun._id, ...ingredient];
    dispatch(createOrder(order));
  };
  const closeOrderModal = () => {
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
