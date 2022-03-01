/// <reference types="cypress"/>
import contrato from '../contratcs/produtos.contract'

describe('Testes da Funcionalidade Produtos', () => {
    let token
    before(() => {
        cy.token('jorge@qa.com.br', 'teste').then(tkn => { token = tkn })
    });

    it.only('Deve validar contrato de produtos', () => {
        cy.request('produtos').then(response =>{
            return contrato.validateAsync(response.body)
        })
    });

    it('Listar Produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).then((response) =>{
            //expect(response.body.produtos[0].nome).to.equal('Produto EBAC 96446')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('quantidade' && 'produtos')
            expect(response.duration).to.be.lessThan(15)
        })
    });

    it('Cadastrar Produto', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`
        cy.request({
            method: 'POST',
            url: 'produtos',
            body:{
                "nome": produto,
                "preco": 85,
                "descricao": "Blusa",
                "quantidade": 25
              },
              headers: {authorization: token}
        }).then((response) =>{
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            
        })
    });

    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.cadastrarProduto(token, "Produto EBAC 96446", 90, "Calça", 30)
        .then((response) =>{
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal("Já existe produto com esse nome")
        })
    });

    it('Deve editar um produto já cadastrado', () => {
        cy.request('produtos').then(response =>{
            let id = response.body.produtos[0]._id
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: {authorization: token},
                body:{
                    "nome": "Produto EBAC 9000",
                    "preco": 100,
                    "descricao": "Produto Editado",
                    "quantidade": 250
                  }
            }).then((response) =>{
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal("Registro alterado com sucesso")
            })
        })
    });

    it('Deve editar um produto cadastrado previamente', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`
        cy.cadastrarProduto(token, produto, 90, "Calça", 30)
        .then(response =>{
            let id = response.body._id

            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: {authorization: token},
                body:{
                    "nome": produto,
                    "preco": 150,
                    "descricao": "Produto Editado",
                    "quantidade": 25
                  }
            }).then((response) =>{
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal("Registro alterado com sucesso")
            })
        })
    });

    it('Deve deletar um produto previamente cadastrado', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 100000000)}`
        cy.cadastrarProduto(token, produto, 90, "Calça", 30)
        .then(response =>{
            let id = response.body._id

            cy.request({
                method: 'DELETE',
                url: `produtos/${id}`,
                headers: {authorization: token},
               
            }).then((response) =>{
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal("Registro excluído com sucesso")
            })
        })
    });


});



    