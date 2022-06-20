Cypress.Commands.add('fillMantoryFieldsAndSubmit', function(){
    
    cy.get('#firstName').type('Carina').should('be.visible').should('have.value','Carina')
    cy.get('#lastName').type('Gouveia')
    cy.get('#email').type('carinagouveiabarros@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    
})