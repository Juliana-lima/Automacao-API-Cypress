/// <reference types="cypress"/>


describe('Testes da Funcionalidade Produtos', () => {
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

    it.only('Cadastrar Produto', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            body:{
                "nome": "Produto EBAC 1003",
                "preco": 35,
                "descricao": "Caderno",
                "quantidade": 260
              },
              headers: {authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1bGlhbmF0ZXN0YWRvcmFAcWEuY29tLmJyIiwicGFzc3dvcmQiOiJ0ZXN0ZSIsImlhdCI6MTY0NjE0MDQ3OCwiZXhwIjoxNjQ2MTQxMDc4fQ.TsktqogfexxQYmDgPB2mRguPatpJVmSPXN5JMo97WPo'}
        }).then((response) =>{
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            
        })
    });
})

    