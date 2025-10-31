import cadastro from '../cadastro'
import userData from '../../fixtures/example.json'

class Carrinho {
    adicionarProdutosNoCarrinho() {
        cy.get('a[data-product-id="3"]').eq(1).click({force: true})
        cy.get('[data-dismiss="modal"]').click()
        cy.get('a[data-product-id="7"]').eq(1).click({force: true})
        cy.get('[data-dismiss="modal"]').click()
        cy.get('a[data-product-id="38"]').eq(1).click({force: true})
    }

    navegarParaCarrinho() {
        cy.get('a[href="/view_cart"]').first().click({force: true})
        cy.url().should('eq', 'https://automationexercise.com/view_cart')
    }

    fazerCheckout() {
        cy.get('a.btn').click()
        cy.get('li.active').should('have.text', 'Checkout')
    }

    adicionarInformacoesDePagamento(){
      cy.get('h2.heading').should('have.text', 'Payment');
      cy.get('[data-qa="name-on-card"]').type(cadastro.dadosUsuario.firstName + ' ' + cadastro.dadosUsuario.lastName)
      cy.get('[data-qa="card-number"]').type(userData.cardNumber)
      cy.get('[data-qa="cvc"]').type(userData.cvc)
      cy.get('[data-qa="expiry-month"]').type(`${userData.mes}`)
      cy.get('[data-qa="expiry-year"]').type(`${userData.ano}`)
    }
}

export default new Carrinho()