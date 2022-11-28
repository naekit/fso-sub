describe('Blog app', function(){
  beforeEach(function() {
    cy.request('POST', 'http://localhost:4000/api/testing/reset')
    cy.request('POST', 'http://localhost:4000/api/users', {
      username: 'super',
      name: 'superuser',
      password: 'super'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function(){
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('super')
      cy.get('#password').type('super')

      cy.contains('login').click()
      cy.contains('superuser logged in')
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('super')
      cy.get('#password').type('wrong')

      cy.contains('login').click()

      cy.get('.error')
        .should('have.css', 'background-color', 'rgb(255, 0, 0)')

      cy.get('html')
        .should('not.contain', 'superuser logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'super', password:'super' })
    })

    it('a blog can be created', function() {
      cy.contains('add blog').click()

      cy.get('#title').type('test blog')
      cy.get('#author').type('test user')
      cy.get('#url').type('https://www.testurl.com')

      cy.contains('create').click()
      cy.contains('test blog')
      cy.contains('test user')
      cy.contains('show').click()
      cy.contains('https://www.testurl.com')
    })
    describe('can like and delete blog', function(){
      beforeEach(function() {
        cy.createBlog({ title:'test', author:'cy', url:'https://www.cy.com', likes: 4 })
        cy.createBlog({ title:'like', author:'cy', url:'https://www.cy.com', likes: 0 })
      })

      it('user can like blog', function(){
        cy.contains('show').click()
        cy.contains('like').click()

        cy.contains('like: 5')
      })

      it('user can delete blog', function(){
        cy.contains('show').click()
        cy.contains('remove').click()

        cy.get('html')
          .should('not.contain', 'test')
      })

      it('ordered by likes', function(){
        cy.get('.blog').eq(0).get('.hide').eq(0).click()
        cy.get('.blog').eq(1).get('.hide').eq(1).click()

        cy.get('.blog').eq(0).should('contain', 'like: 4')
        cy.get('.blog').eq(1).should('contain', 'like: 0')
      })
    })
  })
})