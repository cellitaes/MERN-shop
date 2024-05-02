/// <reference types="cypress" />

import productsData from '../../fixtures/products.json';

describe('Testing products loading', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/products*', (req) => {
            const { category, skip, limit } = req.query;

            let filteredProducts = productsData.products;

            if (category !== 'null') {
                filteredProducts = filteredProducts.filter(
                    (product) => product.category._id === category
                );
            }
            let dataLength = filteredProducts.length;

            const startIndex = skip ? +skip : 0;
            const endIndex = limit
                ? startIndex + +limit
                : filteredProducts.length;

            const slicedProducts = filteredProducts.slice(startIndex, endIndex);
            req.reply({ products: slicedProducts, dataLength });
        }).as('getProducts');
    });

    it('should load first 6 items', () => {
        cy.visit('/');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });

        cy.get('ul[class="products-pagination"]')
            .children()
            .should('exist')
            .and('have.length', 4);
        cy.getByDataCy('product-item').should('have.length', 6);
    });

    it('should check if pagination works as expected', () => {
        cy.visit('/');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });

        cy.getByDataCy('product-item').should('have.length', 6);
        cy.get('a[aria-label="Page 2"]').click();
        cy.getByDataCy('product-item').should('have.length', 2);
    });
});
