/// <reference types="cypress" />

describe('Testing registration', () => {
    it('should successfully register', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').type('test@testtest.pl');
        cy.get('[data-testid="password"]').type('Haselko123!');
        cy.get('[data-testid="confirmPassword"]').type('Haselko123!');
        cy.get('[data-testid="name"]').type('Test');
        cy.get('[data-testid="surname"]').type('User');

        cy.getByDataCy('Register').click();

        cy.location('pathname').should('eq', '/products');
    });

    it('should fail register when user already exist', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').type('test@testtest.pl');
        cy.get('[data-testid="password"]').type('Haselko123!');
        cy.get('[data-testid="confirmPassword"]').type('Haselko123!');
        cy.get('[data-testid="name"]').type('Test');
        cy.get('[data-testid="surname"]').type('User');

        cy.getByDataCy('Register').click();

        cy.contains('User exists already, please login instead.');
    });

    it('should fail register when password doesnt have special character', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').type('test@testtest.pl');
        cy.get('[data-testid="password"]').type('Haselko123');
        cy.get('[data-testid="confirmPassword"]').type('Haselko123');
        cy.get('[data-testid="name"]').type('Test');
        cy.get('[data-testid="surname"]').type('User');

        cy.getByDataCy('Register').should('be.disabled');

        cy.contains(
            'The password must contain at least one special character.'
        );
    });

    it('should fail register when at least one letter isnt uppercase', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').type('test@testtest.pl');
        cy.get('[data-testid="password"]').type('haselko123!');
        cy.get('[data-testid="confirmPassword"]').type('haselko123!');
        cy.get('[data-testid="name"]').type('Test');
        cy.get('[data-testid="surname"]').type('User');

        cy.getByDataCy('Register').should('be.disabled');

        cy.contains('The password must contain at least one uppercase letter.');
    });

    it('should fail register when at least one letter isnt lowercase', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').type('test@testtest.pl');
        cy.get('[data-testid="password"]').type('HASELKO123!');
        cy.get('[data-testid="confirmPassword"]').type('HASELKO123!');
        cy.get('[data-testid="name"]').type('Test');
        cy.get('[data-testid="surname"]').type('User');

        cy.getByDataCy('Register').should('be.disabled');

        cy.contains('The password must contain at least one lowercase letter.');
    });

    it('should fail register when password should contain at least one digit', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').type('test@testtest.pl');
        cy.get('[data-testid="password"]').type('Haselko!');
        cy.get('[data-testid="confirmPassword"]').type('Haselko!');
        cy.get('[data-testid="name"]').type('Test');
        cy.get('[data-testid="surname"]').type('User');

        cy.getByDataCy('Register').should('be.disabled');

        cy.contains('The password must contain at least one digit.');
    });

    it('should fail register when password is too short', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').type('test@testtest.pl');
        cy.get('[data-testid="password"]').type('Has12!');
        cy.get('[data-testid="confirmPassword"]').type('Has12!');
        cy.get('[data-testid="name"]').type('Test');
        cy.get('[data-testid="surname"]').type('User');

        cy.getByDataCy('Register').should('be.disabled');

        cy.contains(
            'The password must contain at least 8 characters, one of which must be an uppercase letter, one lowercase letter and must have a number and a special character'
        );
    });

    it('should fail register when confirm password field differ', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').type('test@testtest.pl');
        cy.get('[data-testid="password"]').type('Haselko123!');
        cy.get('[data-testid="confirmPassword"]').type('Haselko122!');
        cy.get('[data-testid="name"]').type('Test');
        cy.get('[data-testid="surname"]').type('User');

        cy.getByDataCy('Register').should('be.disabled');

        cy.contains('The passwords entered must be the same');
    });

    it('should fail register when name is too short', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').type('test@testtest.pl');
        cy.get('[data-testid="password"]').type('Haselko123!');
        cy.get('[data-testid="confirmPassword"]').type('Haselko123!');
        cy.get('[data-testid="name"]').type('T');
        cy.get('[data-testid="surname"]').type('User');

        cy.getByDataCy('Register').should('be.disabled');

        cy.contains('Name should be at least 2 characters long');
    });

    it('should fail register when surname is too short', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').type('test@testtest.pl');
        cy.get('[data-testid="password"]').type('Haselko123!');
        cy.get('[data-testid="confirmPassword"]').type('Haselko123!');
        cy.get('[data-testid="name"]').type('Test');
        cy.get('[data-testid="surname"]').type('U');

        cy.getByDataCy('Register').click({ force: true });
        cy.getByDataCy('Register').should('be.disabled');

        cy.contains('Surname should be at least 2 characters long');
    });

    it('should check if all fields are required', () => {
        cy.visit('/auth/register');

        cy.get('[data-testid="email"]').click();
        cy.get('[data-testid="password"]').click();
        cy.get('[data-testid="confirmPassword"]').click();
        cy.get('[data-testid="name"]').click();
        cy.get('[data-testid="surname"]').click();

        cy.getByDataCy('Register').click({ force: true });
        cy.getByDataCy('Register').should('be.disabled');

        cy.contains('Email is required');
        cy.contains('Enter your password.');
        cy.contains('Name is required');
        cy.contains('Surname is required');
    });

    it('should be able to switch between registration and login', () => {
        cy.visit('/auth/register');

        cy.get('.question-navlink').click();

        cy.location('pathname').should('eq', '/auth/login');
    });
});
