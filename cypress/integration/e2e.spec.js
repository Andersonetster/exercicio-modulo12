/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
const dadosEndereco = require('../fixtures/endereco.json');
import EnderecoPage from '../support/page_objects/endereco.page'


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')

    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Aether Gym Pant', '34', 'Blue', 1)
        
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Ajax Full-Zip Sweatshirt', 'S', 'Blue', 2)
        
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Ariel Roll Sleeve Sweatshirt', 'XS', 'Green', 1)
     
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Abominable Hoodie', 'L', 'Red', 3)
        



        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        
       EnderecoPage.editarEnderecoFaturamento(
            'sAnderson',
            'santos',
            'alliance',
            'Brasil',
            'ione do bem',
            '318',
            'serrana',
            'São Paulo',
            '14150000',
            '11965650796',
            'anderson@hotmail.com')

        //cy.get('#payment_method_bacs').click()
        cy.get('#terms').check()
        cy.get('#place_order').click({force:true})
        

        //cy.get('.page-title').should('contain',"PEDIDO RECEBIDO")
        cy.get('.woocommerce-notice').should('contain',"Obrigado. Seu pedido foi recebido.")










    });


})