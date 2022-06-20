 /// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function() {

   beforeEach( function(){
      cy.visit('./src/index.html')

    })
    
    it('verifica o título da aplicação', function() {

      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
   })

    it('preenche os campos obrigatórios e envia o formulário', function(){
      const longTest = 'exibe mensagem de erro ao submeter o formulário com um email com formatação inválidaexibe mensagem de erro ao submeter o formulário com um email com formatação inválidaexibe mensagem de erro ao submeter o formulário com um email com formatação inválidaexibe mensagem de erro ao submeter o formulário com um email com formatação inválidaexibe mensagem de erro ao submeter o formulário com um email com formatação inválidaexibe mensagem de erro ao submeter o formulário com um email com formatação inválidaexibe mensagem de erro ao submeter o formulário com um email com formatação inválida'
      cy.get('#firstName').type('Carina').should('be.visible').should('have.value','Carina')
      cy.get('#lastName').type('Gouveia')
      cy.get('#email').type('carinagouveiabarros@gmail.com')
      cy.get('#open-text-area').type(longTest,{delay: 0})
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
   })

   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

      cy.get('#firstName').type('Carina').should('be.visible').should('have.value','Carina')
      cy.get('#lastName').type('Gouveia')
      cy.get('#email').type('carinagouveiabarros@gmail,com')
      cy.get('#open-text-area').type('teste')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

   })
   it('campo telefone continua vazio quando preenchido com valor não numerico',function(){

      cy.get('#phone').type('ffffffffff').should('have.value','')
   })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
      
      cy.get('#firstName').type('Carina').should('be.visible').should('have.value','Carina')
      cy.get('#lastName').type('Gouveia')
      cy.get('#email').type('carinagouveiabarros@gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

   })

   it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      
      cy.get('#firstName').type('Carina')
      .should('have.value','Carina')
      .clear()
      .should('have.value', '')
 
      cy.get('#lastName').type('Gouveia')
      .should('have.value','Gouveia')
      .clear()
      .should('have.value', '')

      cy.get('#phone').type('123456')
      .should('have.value','123456')
      .clear()
      .should('have.value', '')

      cy.get('#email').type('Carinagouveiabarros@gmail.com')
      .should('have.value','Carinagouveiabarros@gmail.com')
      .clear()
      .should('have.value', '')

      cy.get('#open-text-area').type('teste')
      .should('have.value','teste')
      .clear()
      .should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){

   cy.contains('button', 'Enviar').click()

   cy.get('.error').should('be.visible')

  })

   //Eliminando duplicação de código
   it('envia o formulário com sucesso usando um comando customizado',function(){
      cy.fillMantoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
   })

   it('seleciona um produt (Youtube) por seu texto',function(){
      cy.get('#product')
      .select('YouTube')
      .should('have.value','youtube')
   })

   it('seleciona um produt (Youtube) por seu valor',function(){
      const valSelect = 'mentoria'
      cy.get('#product')
      .select(valSelect)
      .should('have.value',valSelect)
   })
   it('seleciona um produto (Blog) por seu índice', ()=>{
      cy.get('#product')
      .select(1)
      .should('have.value','blog')
   })
  it('marca o tpo de atendimento "FeedBack"', ()=>{
   cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value' ,'feedback')
  })

  it('marca cada tipo de elemento',()=>{
   cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){ //percorre
      cy.wrap($radio).check() //empacota para executar comando cypress
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca ambos',()=>{
   cy.get('input[type="checkbox"]')
    .check()
    .last()
    .uncheck()
    .should('not.be.checked')
    
  })
  it('selecione um arquivo da pasta fixtures',()=>{
   cy.get('input[type="file"]').should('not.have.value')
    .selectFile('cypress/fixtures/example.json')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
  })
    
  })

  it('selecione um arquivo simulando um drag-and-drop',()=>{
   cy.get('input[type="file"]').should('not.have.value')
    .selectFile('cypress/fixtures/example.json',{action:'drag-drop'}) //simula como se estivesse arrastando o arquivo para o input
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
  })
    
  })

  it('selecione um arquivo utilizando um fixture para qual foi dada um alias',()=>{
   cy.fixture('example.json').as('sampleFile')//alias
   cy.get('input[type="file"]')
   .selectFile('@sampleFile')
   .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
  })
  })
  it('verifica se a politica de privacidade abre em outra aba sem a necessidade de um clique',()=>{
   cy.get('#privacy a')
   .should('have.attr', 'target', '_blank')
 
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{
   cy.get('#privacy a')
   .invoke('removeAttr', 'target')
   .click()
   
   cy.contains('Talking About Testing').should('be.visible')
 
  })

})
