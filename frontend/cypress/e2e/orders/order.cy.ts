/// <reference types="cypress" />

import productsData from '../../fixtures/products.json';

describe('Testing ordering', () => {
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
        cy.intercept('POST', '/api/orders/place-order', {
            status: 'ok',
            statusCode: 201,
        }).as('placeOrder');
    });

    // it('should not be able to see order button when cart is empty', () => {
    //     cy.login('admin');
    //     cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
    //         expect(interception.response?.statusCode).to.equal(200);
    //     });

    //     cy.getByDataCy('add-to-cart').each(($button) => {
    //         cy.wrap($button).click();
    //     });
    //     cy.getByDataCy('total-qty').should('contain', '6');

    //     cy.getByDataCy('cart').click();
    //     cy.get('li[class="cart-item"]').should('have.length', 6);

    //     cy.getByDataCy('order-btn').should('exist');

    //     cy.getByDataCy('decrease-cart-item').each(($button) => {
    //         cy.wrap($button).click();
    //     });

    //     cy.get('li[class="cart-item"]').should('have.length', 0);
    //     cy.contains('Your Shopping Cart is empty');
    //     cy.getByDataCy('order-btn').should('not.exist');
    // });

    // it('should add every element from first page to cart', () => {
    //     cy.login('admin');
    //     cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
    //         expect(interception.response?.statusCode).to.equal(200);
    //     });

    //     cy.getByDataCy('add-to-cart').each(($button) => {
    //         cy.wrap($button).click();
    //     });
    //     cy.getByDataCy('total-qty').should('contain', '6');

    //     cy.getByDataCy('cart').click();
    //     cy.get('li[class="cart-item"]').should('have.length', 6);

    //     cy.getByDataCy('order-btn').click();
    //     cy.location('pathname').should('eq', '/order');
    // });

    // it('should not be able to place order when order form is not filled', () => {
    //     cy.login('admin');
    //     cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
    //         expect(interception.response?.statusCode).to.equal(200);
    //     });

    //     cy.getByDataCy('add-to-cart').each(($button) => {
    //         cy.wrap($button).click();
    //     });
    //     cy.getByDataCy('total-qty').should('contain', '6');

    //     cy.getByDataCy('cart').click();
    //     cy.get('li[class="cart-item"]').should('have.length', 6);

    //     cy.getByDataCy('order-btn').click();
    //     cy.location('pathname').should('eq', '/order');

    //     cy.getByDataCy('place-order-btn').should('be.disabled');
    // });

    // it('should check if all fields are required', () => {
    //     cy.login('admin');
    //     cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
    //         expect(interception.response?.statusCode).to.equal(200);
    //     });

    //     cy.getByDataCy('add-to-cart').each(($button) => {
    //         cy.wrap($button).click();
    //     });
    //     cy.getByDataCy('total-qty').should('contain', '6');

    //     cy.getByDataCy('cart').click();
    //     cy.get('li[class="cart-item"]').should('have.length', 6);

    //     cy.getByDataCy('order-btn').click();
    //     cy.location('pathname').should('eq', '/order');

    //     cy.get('[data-testid="email"]').click();
    //     cy.get('[data-testid="name"]').click();
    //     cy.get('[data-testid="surname"]').click();
    //     cy.get('[data-testid="postalCode"]').click();
    //     cy.get('[data-testid="city"]').click();
    //     cy.get('[data-testid="postalCode"]').click();

    //     cy.contains('Enter valid email');
    //     cy.contains('Enter name');
    //     cy.contains('Enter surname');
    //     cy.contains('Enter valid postal code. XX-XXX');
    //     cy.contains('Enter valid city');
    // });

    // it('should check if email validation works', () => {
    //     cy.login('admin');
    //     cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
    //         expect(interception.response?.statusCode).to.equal(200);
    //     });

    //     cy.getByDataCy('add-to-cart').each(($button) => {
    //         cy.wrap($button).click();
    //     });
    //     cy.getByDataCy('total-qty').should('contain', '6');

    //     cy.getByDataCy('cart').click();
    //     cy.get('li[class="cart-item"]').should('have.length', 6);

    //     cy.getByDataCy('order-btn').click();
    //     cy.location('pathname').should('eq', '/order');

    //     cy.get('[data-testid="email"]').type('e.pl');
    //     cy.get('[data-testid="name"]').type('name');
    //     cy.get('[data-testid="surname"]').type('surname');
    //     cy.get('[data-testid="postalCode"]').type('34-234');
    //     cy.get('[data-testid="city"]').type('city');

    //     cy.contains('Enter valid email');
    // });

    // it('should check if post-code validation works', () => {
    //     cy.login('admin');
    //     cy.wait('@getProducts', { timeout: 5000 }).then((interception) => {
    //         expect(interception.response?.statusCode).to.equal(200);
    //     });

    //     cy.getByDataCy('add-to-cart').each(($button) => {
    //         cy.wrap($button).click();
    //     });
    //     cy.getByDataCy('total-qty').should('contain', '6');

    //     cy.getByDataCy('cart').click();
    //     cy.get('li[class="cart-item"]').should('have.length', 6);

    //     cy.getByDataCy('order-btn').click();
    //     cy.location('pathname').should('eq', '/order');

    //     cy.get('[data-testid="email"]').type('email@test.pl');
    //     cy.get('[data-testid="name"]').type('name');
    //     cy.get('[data-testid="surname"]').type('surname');
    //     cy.get('[data-testid="postalCode"]').type('3s-234');
    //     cy.get('[data-testid="city"]').type('city');

    //     cy.contains('Enter valid postal code. XX-XXX');
    // });

    it('should place valid order', () => {
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

        cy.getByDataCy('order-btn').click();
        cy.location('pathname').should('eq', '/order');

        cy.get('[data-testid="email"]').type('email@test.pl');
        cy.get('[data-testid="name"]').type('name');
        cy.get('[data-testid="surname"]').type('surname');
        cy.get('[data-testid="postalCode"]').type('32-234');
        cy.get('[data-testid="city"]').type('city');

        cy.getByDataCy('place-order-btn').click();
        cy.wait('@placeOrder', { timeout: 5000 }).then((interception) => {
            expect(interception.response?.statusCode).to.equal(201);
        });
        cy.location('pathname').should('eq', '/products');
    });
});
