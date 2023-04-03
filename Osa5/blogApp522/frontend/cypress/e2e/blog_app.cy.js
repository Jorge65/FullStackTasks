describe('Blog frontpage ', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs app')
    cy.contains('log in')
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Jorma Kemppainen',
      username: 'jorkki',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
  })

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('jorkki')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Jorma Kemppainen logged in')
      cy.get('#logout-button').click()
    })

    it('succeeds with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('jorkki')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('jorkki')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('Kuinka katson telkkaria suomalaisittain')
      cy.get('#author-input').type('Auttori Suomalainen')
      cy.get('#url-input').type('http://www.yle.fi')
      cy.contains('create').click()
      cy.contains('Added blog with title')
      cy.contains('Kuinka katson telkkaria suomalaisittain')
    })

    describe('when a blog exists', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title-input').type('Kuinka katson telkkaria suomalaisittain')
        cy.get('#author-input').type('Auttori Suomalainen')
        cy.get('#url-input').type('http://www.yle.fi')
        cy.contains('create').click()
        cy.contains('Added blog with title')
        cy.contains('Kuinka katson telkkaria suomalaisittain')
      })

      it('a new blog can be liked', function() {
        cy.get('#view-button').click()
        cy.contains('likes 0')
        cy.get('#like-button').click()
        cy.get('#like-button').click()
        cy.get('#like-button').click()
        cy.contains('likes 3')
      })

      it('a blog can deleted', function() {
        cy.get('#view-button').click()
        cy.get('#remove-button').click()
        cy.contains('blog was removed')
      })
    })
  })

  describe('when another user logged ', function() {
    beforeEach(function() {
      /* second user is created */
      const user = {
        name: 'Jorma2 Kemppainen',
        username: 'jorkki2',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3000/api/users/', user)

      /* first user logs in and adds a blog */
      cy.contains('log in').click()
      cy.get('#username').type('jorkki')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('new blog').click()
      cy.get('#title-input').type('Kuinka katson telkkaria suomalaisittain')
      cy.get('#author-input').type('Auttori Suomalainen')
      cy.get('#url-input').type('http://www.yle.fi')
      cy.contains('create').click()
      cy.get('#view-button').click()
    })

    it.only('remove visible for creator, not visible for other user', function() {
      /* remove button visible before new login*/
      cy.get('#remove-button')
      cy.get('#logout-button').click()
      /* first user logs in and adds a blog */

      cy.contains('log in').click()
      cy.get('#username').type('jorkki2')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('#view-button').click()
      cy.get('#remove-button')

    })
  })

})