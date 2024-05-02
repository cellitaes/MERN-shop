/// <reference types="cypress" />

Cypress.Commands.add('getByDataCy', (id: string) => {
    return cy.get(`[data-cy="${id}"]`);
});

Cypress.Commands.add('login', (user: string) => {
    cy.visit('/auth/login');
    cy.fixture(`${user}-credentials.json`).then((cred) => {
        cy.get('[data-testid="email"]').type(cred.login);
        cy.get('[data-testid="password"]').type(cred.password);
        cy.getByDataCy('Login').click();
    });
});

Cypress.Commands.add('logout', () => {
    cy.getByDataCy('account-manager').click();
    cy.getByDataCy('logout').click();
});
