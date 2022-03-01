/// <reference types="cypress"/>


describe('Login - Teste da API Serverest', () => {
    it('Deve fazer login com sucesso', () => {
        cy.request({ //Método + Objeto
            method: 'POST',
            url:"login",
            body:{
                "email": "julianatestadora@qa.com.br",
                "password": "teste"
              }
            
        }).then(response =>{
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            cy.log(response.body.authorization)
        })
    });
});