/// <reference types="cypress" />

describe('Testing routes', () => {
    it('should check if all public routes render correctly', () => {
        cy.visit('/');

        cy.getByDataCy('products').click();
        cy.location('pathname').should('eq', '/products');

        cy.getByDataCy('authenticate').click();
        cy.location('pathname').should('eq', '/auth/login');

        cy.get('.question-navlink').click();
        cy.location('pathname').should('eq', '/auth/register');
    });

    it('should check if all private routes redirect correclty', () => {
        cy.visit('/cart');
        cy.location('pathname').should('eq', '/auth/login');

        cy.visit('/order');
        cy.location('pathname').should('eq', '/auth/login');

        cy.visit('/manage/users');
        cy.location('pathname').should('eq', '/auth/login');

        cy.visit('/manage/products');
        cy.location('pathname').should('eq', '/auth/login');
    });

    it('should check if non existing routes are handled correctly', () => {
        cy.visit('/cartt');
        cy.location('pathname').should('eq', '/403');
        cy.contains('Page not Found');

        cy.visit('/poducts');
        cy.location('pathname').should('eq', '/403');
        cy.contains('Page not Found');

        cy.visit('/manage/settings');
        cy.location('pathname').should('eq', '/403');
        cy.contains('Page not Found');
    });

    it('should check if private routes are rendered correctly', () => {
        cy.login('admin');
        cy.location('pathname').should('eq', '/products');

        cy.visit('/cart');
        cy.location('pathname').should('eq', '/cart');

        cy.visit('/order');
        cy.location('pathname').should('eq', '/order');
    });

    it('should check if redirect when no items in cart', () => {
        cy.login('admin');
        cy.location('pathname').should('eq', '/products');

        cy.visit('/order');
        cy.location('pathname').should('eq', '/products');
    });

    it('should check if admin routes are protected', () => {
        cy.login('admin');
        cy.location('pathname').should('eq', '/products');

        cy.visit('/manage/users');
        cy.location('pathname').should('eq', '/manage/users');

        cy.visit('/manage/products');
        cy.location('pathname').should('eq', '/manage/products');

        cy.logout();
        cy.login('user');

        cy.visit('/manage/users');
        cy.location('pathname').should('eq', '/auth/login');

        cy.visit('/manage/products');
        cy.location('pathname').should('eq', '/auth/login');
    });
});
