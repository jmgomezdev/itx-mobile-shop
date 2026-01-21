describe('Product search', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('filters product list from search input', () => {
    cy.get('[data-testid^="product-card-"]').first().as('firstCard');

    cy.get('@firstCard')
      .find('h3')
      .invoke('text')
      .then((model) => {
        const term = model.trim();

        cy.get('[data-testid="product-search-input"]').clear().type(term);
        cy.get('[data-testid^="product-card-"]').should(
          'have.length.at.least',
          1
        );
        cy.get('[data-testid^="product-card-"]').first().click();

        cy.get('[data-testid="product-detail-description"]').should(
          'contain.text',
          term
        );
      });
  });
});
