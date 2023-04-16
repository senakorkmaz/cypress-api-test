/// <reference types="cypress" />

describe('Intercept',()=>{
    
    it("Test with interception",()=>{
        cy.visit("https://jsonplaceholder.typicode.com/")
        cy.intercept({
            path : '/posts'
        }).as('posts')

        cy.get("table:nth-of-type(1) a[href='/posts']").click();
        cy.wait('@posts').then(inter =>{
            cy.log(JSON.stringify(inter));
            expect(inter.response.body).to.have.length(100);
        })

    });

    it("mocking with interception with static response",()=>{
        cy.visit("https://jsonplaceholder.typicode.com/")
        cy.intercept('GET','/posts',{totalpost:5,name:'senanur'}).as('posts')
        cy.get("table:nth-of-type(1) a[href='/posts']").click();
        cy.wait('@posts');
    });

    it("mocking with interception with dynamic fixtures",()=>{
        cy.visit("https://jsonplaceholder.typicode.com/")
        cy.intercept('GET','/posts',{fixture:'createUserData.json'}).as('posts')
        cy.get("table:nth-of-type(1) a[href='/posts']").click();
        cy.wait('@posts');
    });

})