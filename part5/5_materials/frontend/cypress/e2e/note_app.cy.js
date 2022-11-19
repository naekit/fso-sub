describe('Note app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'super',
      password: 'super'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Note')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('login fails with wrong password', function(){
    cy.contains('login').click()
    cy.get('#username').type('super')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Superuser logged-in')
  })

  it('user can login', function(){
    cy.contains('login').click()
    cy.get('#username').type('super')
    cy.get('#password').type('super')
    cy.get('#login-button').click()

    cy.contains('Superuser logged-in')
  })

  describe('when logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'super', password: 'super' })
    })

    it('a new note can be created', function(){
      cy.contains('new note').click()
      cy.get('#noteInput').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exists', function(){
      beforeEach(function() {
        cy.createNote({ content:'first note', important:false })
        cy.createNote({ content:'second note', important:false })
        cy.createNote({ content:'third note', important:false })
      })

      it('one can be made important', function() {
        cy.contains('second note')
          .contains('to important')
          .click()

        cy.contains('second note')
          .contains('to not important')
      })
    })
  })
})