describe('Product options and cart', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('selects options and adds to cart', () => {
    cy.get('[data-testid^="product-card-"]').first().click();

    cy.get('[data-testid="product-detail-image"]').should('be.visible');

    cy.get('[data-testid="product-storage-select"]').should('be.visible');
    cy.get('[data-testid="product-color-select"]').should('be.visible');

    cy.get('[data-testid="product-storage-select"]')
      .find('option')
      .then(($options) => {
        if ($options.length > 1) {
          cy.get('[data-testid="product-storage-select"]').select(
            $options.eq(1).val() as string
          );
        }
      });

    cy.get('[data-testid="product-color-select"]')
      .find('option')
      .then(($options) => {
        if ($options.length > 1) {
          cy.get('[data-testid="product-color-select"]').select(
            $options.eq(1).val() as string
          );
        }
      });

    cy.get('[data-testid="cart-count"]')
      .invoke('text')
      .then((value) => {
        const initial = Number.parseInt(value, 10) || 0;

        cy.get('[data-testid="add-to-cart-button"]').click();
        cy.get('[data-testid="cart-count"]').should(($count) => {
          const next = Number.parseInt($count.text(), 10) || 0;
          expect(next).to.be.greaterThan(initial);
        });
      });
  });
});
