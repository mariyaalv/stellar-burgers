/// <reference path="../support/index.d.ts" />
Cypress.Commands.add('getElement', (value) => {
  cy.get(`[data-cy=${value}]`);
});

describe('add ingredients to constructor', function () {
  //create value
  const bun = 'bun';
  const main = 'main';
  const sauce = 'sauce';

  const topOfBurger = 'bun-top';
  const centerOfBurger = 'ingredients';
  const bottonOfBurger = 'bun-botton';

  const modal = 'modal';

  beforeEach(() => {
    // перехватили запрос и подставили в ответ свои данные
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  describe('should add elements to constructor', () => {
    it('should add bun to constructor', () => {
      cy.getElement(bun).contains('Добавить').click();
      //проверка на существование
      cy.getElement(topOfBurger).contains('Ингредиент 1').should('exist');
      cy.getElement(bottonOfBurger).contains('Ингредиент 1').should('exist');
    });

    it('should add ingredient to constructor', () => {
      cy.getElement(main).contains('Добавить').click();
      cy.getElement(sauce).contains('Добавить').click();

      cy.getElement(centerOfBurger).contains('Ингредиент 2').should('exist');
      cy.getElement(centerOfBurger).contains('Ингредиент 4').should('exist');
    });
  });

  describe('should work correctly modals', () => {
    it('should open modal of ingredient', () => {
      cy.getElement(bun).contains('Ингредиент 1').click();
      cy.getElement(modal).should('be.visible');
    });

    it('should close modal of ingredient with click to icon', () => {
      cy.getElement(bun).contains('Ингредиент 1').click();
      cy.getElement(modal)
        .should('contain', 'Ингредиент 1')
        .find('button')
        .click()
        .should('not.exist');
    });

    it('should close modal of ingredient with click to overlay', () => {
      cy.getElement(bun).contains('Ингредиент 1').click();
      cy.getElement(modal)
        .get('[data-cy=overlay]')
        .click('top', { force: true })
        .should('not.exist');
    });
  });

  describe('create order', () => {
    before(() => {
      cy.intercept('POST', 'api/orders', {
        fixture: 'postOrder.json'
      }).as('postOrder');
      // Подставляются моковые токены авторизации.
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('testRefreshToken')
      );
      cy.setCookie('accessToken', 'testAccessToken');
    });

    after(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
    });

    it('should create order', () => {
      // Создание заказа:
      cy.getElement(bun).contains('Добавить').click();
      cy.getElement(main).contains('Добавить').click();
      cy.getElement(sauce).contains('Добавить').click();
      cy.contains('Оформить заказ').click();

      // Проверяется, что модальное окно открылось и номер заказа верный.
      cy.getElement(modal).should('exist').and('contain', '123456');

      // Закрывается модальное окно и проверяется успешность закрытия.
      cy.getElement(modal).find('button').click().should('not.exist');

      // Проверяется, что конструктор пуст
      cy.contains('Выберите булки');
      cy.contains('Выберите начинку');
    });
  });
});
