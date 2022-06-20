it('testa a pagina de provacidade de forma independente', ()=>{
cy.visit('./src/privacy.html')
cy.contains('Talking About Testing').should('be.visible')
})