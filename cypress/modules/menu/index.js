class Menu {
  navegarParaLogin() {
    cy.get('a[href="/login"]').click()
  }

  efetuarLogout() {
    cy.get('a[href="/logout"]').should('be.visible').click()
  }

  navegarParaProdutos() {
    cy.get('a[href="/products"]').click()
    cy.get('.title').should('have.text', 'All Products')
  }

}

export default new Menu()