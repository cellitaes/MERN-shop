/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        getByDataCy(id: string): Chainable<JQuery<HTMLElement>>;
        login(user: string): Chainable<JQuery<HTMLElement>>;
        logout(): Chainable<JQuery<HTMLElement>>;
    }
}
