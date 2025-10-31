import userData from '../fixtures/example.json'
import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import contato from '../modules/contato'
import carrinho from '../modules/carrinho'
import { getRandomEmail } from '../support/helpers'

describe('Automation Exercise - Trabalho Final de Automação de Testes WEB', () => {  
  context('Funcionalidades de Login, Cadastro, Contato, Produtos e Carrinho de Compras', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
        cy.navegarParaLogin();
    });

    it("Test Case 1: Cadastrar usuário", () => {
      login.preencherFormularioDePreCadastro()
      cadastro.prencherFormularioDeCadastroCompleto()

      cy.url().should('eq', 'https://automationexercise.com/account_created');
      cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');
      cy.get('[data-qa="continue-button"]').click();
      cy.contains(`Logged in as `)
    });

    it('Test Case 2: Login de Usuário com e-mail e senha corretos', () => {
      login.preencherFormularioDeLogin(userData.email, userData.password)

      cy.get('i.fa-user').parent().should('contain', userData.name)
      cy.get('a[href="/logout"]').should('be.visible')

      cy.get(':nth-child(10) > a')
        .should('be.visible')
        .and('have.text', ` Logged in as ${userData.name}`);

      cy.contains('b', userData.name)
      cy.contains(`Logged in as ${userData.name}`)
    });

    it('Test Case 3: Login de Usuário com e-mail e senha incorretos', () => {
      login.preencherFormularioDeLogin(userData.email, '54321')

      cy.get('#form p').should('contain', 'Your email or password is incorrect!')
   });

    it('Test Case 4: Logout de Usuário', () => {
      login.preencherFormularioDeLogin(userData.email, userData.password)
      menu.efetuarLogout()

      cy.url().should('contain', 'login')
      cy.contains('Login to your account')
      cy.get('a[href="/logout"]').should('not.exist')
      cy.get('a[href="/login"]').should('contain', 'Signup / Login')
    });

    it('Test Case 5: Cadastrar Usuário com e-mail existente no sistema', () => {
      login.preencherFormularioDePreCadastro(userData.email)

      cy.contains('button', 'Signup').click()
      cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });

    it('Test Case 6: Enviar um Formulário de Contato com upload de arquivo', () => {
      cy.get('a[href*=contact]').click()
      contato.preencherFormularioDeContato()

      cy.get('[data-qa="submit-button"]').click()

      cy.get('.status').should('be.visible')
      cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });

    it("Test Case 8: Verificar todos os produtos e a página de detalhes do produto", () => {
      menu.navegarParaProdutos();

      cy.url().should('eq', 'https://automationexercise.com/products');
      cy.get('a[href="/product_details/1"').click();
      cy.url().should('eq', 'https://automationexercise.com/product_details/1');
      cy.get('.product-information').should('be.visible');
      cy.get('.product-information h2').should('have.text', 'Blue Top');
      cy.get('.product-information p').should('contain.text', 'Category: Women > Tops');
      cy.get('.product-information span').should('contain.text', 'Rs. 500');
      cy.get('.product-information p').should('contain.text', 'Availability: In Stock');
      cy.get('.product-information p').should('contain.text', 'Condition: New');
      cy.get('.product-information p').should('contain.text', 'Brand: Polo');
    });

    it("Test case 9: Pesquisar produto", () => {
      menu.navegarParaProdutos();
      cy.get('.title').should('have.text', 'All Products');
      cy.get('input[id="search_product"]').type('dress');
      cy.get('button[id="submit_search"]').click();
      cy.url().should('eq', 'https://automationexercise.com/products?search=dress');
      cy.get('.title').should('have.text', 'Searched Products');
      cy.get('.product-image-wrapper').should("have.length", 9);
      
    });

    it("Test case 10: Verificar possibilidade de subscricao na página inicial", () => {
      cy.get('.single-widget h2').should('have.text', 'Subscription');
      cy.get('input[id="susbscribe_email"]').type(getRandomEmail());
      cy.get('button[id="subscribe"]').click();
      cy.get('.alert-success').should('have.text', 'You have been successfully subscribed!');

    });

    it("Test case 15: Fazer pedido: Cadastrar antes de finalizar a compra", () => {
      login.preencherFormularioDePreCadastro()
      cadastro.prencherFormularioDeCadastroCompleto()
      cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');
      cy.get('[data-qa="continue-button"]').click();
      cy.contains(`Logged in as `)
      
      carrinho.adicionarProdutosNoCarrinho();
      cy.get('.modal-title').should('have.text', 'Added!')
    
      carrinho.navegarParaCarrinho();
      cy.get('.active').should('have.text', 'Shopping Cart')
      cy.get('.cart_product').should("have.length", 3)

      carrinho.fazerCheckout()
      cadastro.validarEnderecoDeEntrega()

      cy.get('.cart_product').should("have.length", 3)
      cy.get('td:nth-child(4) > p').should("have.text", 'Rs. 4300')
      cy.get('.form-control').type(userData.description)
      cy.get('a[href="/payment"]').click()

      carrinho.adicionarInformacoesDePagamento()
      
      cy.get('[data-qa="pay-button"]').click()
      cy.get('[data-qa="order-placed"]').should('be.visible').and('have.text', 'Order Placed!');
      cy.get('#form p').should('be.visible').and('have.text', 'Congratulations! Your order has been confirmed!');
    });

  });

});