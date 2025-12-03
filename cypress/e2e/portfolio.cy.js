describe('Portfolio Application Test', () => {
  
  it('successfully loads the home page', () => {
    cy.visit('http://localhost:5173')
    cy.get('body').should('be.visible')
  })

  it('checks if page has content', () => {
    cy.visit('http://localhost:5173')
    cy.get('body').should('not.be.empty')
  })

  it('checks if page has a title', () => {
    cy.visit('http://localhost:5173')
    cy.title().should('not.be.empty')
  })
})