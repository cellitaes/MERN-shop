/// <reference types="cypress" />

import productsData from '../../fixtures/products.json';

describe('Testing category selection', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/products*', (req) => {
            const { category, skip, limit } = req.query;

            let filteredProducts = productsData.products;

            if (category !== 'null') {
                filteredProducts = filteredProducts.filter(
                    (product) => product.category.name === category
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

    it('should load first 6 items when no category chosen', () => {
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

    it('should filter products with correspondents categories', () => {
        cy.visit('/');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });

        cy.getByDataCy('category-selection').select('Gumowe kaczki');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });
        cy.getByDataCy('product-item').should('have.length', 6);

        cy.getByDataCy('category-selection').select('Lepsze gumowe kaczki');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });
        cy.getByDataCy('product-item').should('have.length', 2);
    });

    it('should filter products and then clear categories filtering', () => {
        cy.visit('/');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });

        cy.getByDataCy('category-selection').select('Lepsze gumowe kaczki');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });
        cy.getByDataCy('product-item').should('have.length', 2);

        cy.getByDataCy('category-selection').select('-');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });
        cy.getByDataCy('product-item').should('have.length', 6);

        cy.contains('Lepsze gumowe kaczki').should('exist');
        cy.contains('Gumowe kaczki').should('exist');
    });
});
