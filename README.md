
# PGATS-WEB-TRABALHO-FINAL (Cypress)


## Sobre o Projeto

Suite de testes E2E com Cypress para https://automationexercise.com — cobre casos descritos na página "Test Cases": 1, 2, 3, 4, 5, 6, 8, 9, 10 e 15.
## Instalação e como executar

- Abra o terminal na pasta do projeto:  
  npm install

- Abrir o Cypress Runner (UI)1:  
  npx cypress open

- Rodar testes (headless)  
  Rodar todos os specs:  
  npx cypress run

- Rodar um spec específico:  
  npx cypress run --spec "cypress/e2e/automation-exercise.cy.js"
## Estrutura relevante

- cypress/e2e/automation-exercise.cy.js — specs principais
- cypress/modules/ — módulos por domínio: menu, login, cadastro, contato, carrinho
- cypress/fixtures/example.json — dados fixos
- cypress/support/helpers.js — utilitários (ex.: getRandomEmail)
## Boas praticas aplicadas

- Uso de seletores estáveis (data-qa/data-test).
- Evitar manter estado entre testes; usar aliases e fixtures.
- Definição de URL global.
- Codigos que se repetem em funções ou arquivos dedicados.
- Ações que se repetem movidos para Hooks.
- Multiplas asserções em cada teste.
- Funções de preenchimento aceitam dados opcionais: permite usar dados determinísticos (passados pelo teste) ou aleatórios (faker/getRandomEmail).