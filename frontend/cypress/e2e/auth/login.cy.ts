/// <reference types="cypress" />

describe('Testing login', () => {
    it('should successfully login', () => {
        cy.visit('/auth/login');

        cy.login('admin');

        cy.location('pathname').should('eq', '/products');
    });

    it('should not login due to wrong email', () => {
        cy.visit('/auth/login');

        cy.get('[data-testid="email"]').type('test@testowy.pl');
        cy.get('[data-testid="password"]').type('Haselko123!');
        cy.getByDataCy('Login').click();

        cy.contains('Invalid credentials, could not log you in.');
    });

    it('should not login due to wrong password', () => {
        cy.visit('/auth/login');

        cy.get('[data-testid="email"]').type('test@test.pl');
        cy.get('[data-testid="password"]').type('Haselko122!');
        cy.getByDataCy('Login').click();

        cy.contains('Invalid credentials, could not log you in.');
    });

    it('should not login when no credentials provided', () => {
        cy.visit('/auth/login');

        cy.getByDataCy('Login').click();

        cy.contains('Invalid credentials, could not log you in.');
    });

    it('should be able to switch between registration and login', () => {
        cy.visit('/auth/login');

        cy.get('.question-navlink').click();

        cy.location('pathname').should('eq', '/auth/register');
    });

    it('should login successfully after wrong login', () => {
        cy.visit('/auth/login');

        cy.get('[data-testid="email"]').type('test@test.pl');
        cy.get('[data-testid="password"]').type('Haselko122!');

        cy.getByDataCy('Login').click();
        cy.contains('Okay').click({ force: true });

        cy.get('[data-testid="email"]').clear();
        cy.get('[data-testid="password"]').clear();

        cy.login('admin');

        cy.location('pathname').should('eq', '/products');
    });
});
