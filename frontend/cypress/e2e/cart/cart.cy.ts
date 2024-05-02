/// <reference types="cypress" />

import productsData from '../../fixtures/products.json';

describe('Testing cart', () => {
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

    it('should add every element from first page to cart', () => {
        cy.login('admin');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });

        cy.getByDataCy('add-to-cart').each(($button) => {
            cy.wrap($button).click();
        });
        cy.getByDataCy('total-qty').should('contain', '6');

        cy.getByDataCy('cart').click();
        cy.get('li[class="cart-item"]').should('have.length', 6);
    });

    it('should be able to clear all cart', () => {
        cy.login('admin');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });

        cy.getByDataCy('add-to-cart').each(($button) => {
            cy.wrap($button).click();
        });
        cy.getByDataCy('total-qty').should('contain', '6');

        cy.getByDataCy('cart').click();
        cy.get('li[class="cart-item"]').should('have.length', 6);

        cy.getByDataCy('decrease-cart-item').each(($button) => {
            cy.wrap($button).click();
        });

        cy.get('li[class="cart-item"]').should('have.length', 0);
        cy.contains('Your Shopping Cart is empty');
    });

    it('should be able increase every element that is inside cart', () => {
        cy.login('admin');
        cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(200);
        });

        cy.getByDataCy('add-to-cart').each(($button) => {
            cy.wrap($button).click();
        });
        cy.getByDataCy('total-qty').should('contain', '6');

        cy.getByDataCy('cart').click();
        cy.get('li[class="cart-item"]').should('have.length', 6);

        cy.getByDataCy('increase-cart-item').each(($button) => {
            cy.wrap($button).click();
        });

        cy.getByDataCy('total-qty').should('contain', '12');
        cy.get('li[class="cart-item"]').should('have.length', 6);
    });
});
