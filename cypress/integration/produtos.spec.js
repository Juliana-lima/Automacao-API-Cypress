/// <reference types="cypress"/>


describe('Testes da Funcionalidade Produtos', () => {
    let token
    before(() => {
        cy.token('jorge@qa.com.br', 'teste').then(tkn => { token = tkn })
    });

    it('Listar Produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).then((response) =>{
            expect(response.body.produtos[0].nome).to.equal('Produto EBAC 96446')
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

    it.only('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.cadastrarProduto(token, "Produto EBAC 96446", 90, "Calça", 30)
        .then((response) =>{
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal("Já existe produto com esse nome")
        })
    });


});



    