describe('add ingredients to constructor', function () {
  beforeEach(() => {
    // перехватили запрос и подставили в ответ свои данные
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  describe('should add elements to constructor', () => {
    it('should add bun to constructor', () => {
      cy.get('[data-cy="bun"]').contains('Добавить').click();
      //проверка на существование
      cy.get('[data-cy=bun-top]').contains('Ингредиент 1').should('exist');
      cy.get('[data-cy=bun-botton]').contains('Ингредиент 1').should('exist');
    });

    it('should add ingredient to constructor', () => {
      cy.get('[data-cy="main"]').contains('Добавить').click();
      cy.get('[data-cy="sauce"]').contains('Добавить').click();

      cy.get('[data-cy=ingredients]').contains('Ингредиент 2').should('exist');
      cy.get('[data-cy=ingredients]').contains('Ингредиент 4').should('exist');
    });
  });

  describe('should work correctly modals', () => {
    it('should open modal of ingredient', () => {
      cy.get('[data-cy="bun"]').contains('Ингредиент 1').click();
      cy.get('[data-cy=modal]').should('be.visible');
    });

    it('should close modal of ingredient with click to icon', () => {
      cy.get('[data-cy="bun"]').contains('Ингредиент 1').click();
      cy.get('[data-cy=modal]')
        .should('contain', 'Ингредиент 1')
        .find('button')
        .click()
        .should('not.exist');
    });

    it('should close modal of ingredient with click to overlay', () => {
      cy.get('[data-cy="bun"]').contains('Ингредиент 1').click();
      cy.get('[data-cy=modal]')
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
      cy.get('[data-cy="bun"]').contains('Добавить').click();
      cy.get('[data-cy="main"]').contains('Добавить').click();
      cy.get('[data-cy="sauce"]').contains('Добавить').click();
      cy.contains('Оформить заказ').click();

      // Проверяется, что модальное окно открылось и номер заказа верный.
      cy.get('[data-cy=modal]').should('exist').and('contain', '123456');

      // Закрывается модальное окно и проверяется успешность закрытия.
      cy.get('[data-cy=modal]').find('button').click().should('not.exist');

      // Проверяется, что конструктор пуст
      cy.contains('Выберите булки');
      cy.contains('Выберите начинку');
    });
  });
});
