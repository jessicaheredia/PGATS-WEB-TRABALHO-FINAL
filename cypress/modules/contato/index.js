import userData from '../../fixtures/example.json'

class Contato {
  preencherFormularioDeContato() { 
    cy.get('[data-qa="name"]').type(userData.name)
    cy.get('[data-qa="email"]').type(userData.email)
    cy.get('[data-qa="subject"]').type(userData.subject)
    cy.get('[data-qa="message"]').type(userData.message)
    cy.fixture('pacmanimage.jpeg').as('arquivo')
    cy.get('input[type=file]').selectFile('@arquivo')
  }
}
export default new Contato()