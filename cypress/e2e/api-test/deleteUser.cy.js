/// <reference types="cypress" />
import data from '../../fixtures/data.json';
//const createDataJson = require('../../fixtures/createUserData.json')
describe('post api user tests',()=>{

    let baseUrl = data["BASEURL"]
    let accessToken = data["TOKEN"]
    var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let emailText = ''
    let randomText = ''

    it('Create user test',()=>{
        for (var i = 0; i< 10; i++){
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
        }
            emailText = randomText + '@gmail.com'
            
        cy.fixture('createUserData').then((createData)=>{
            cy.request({
                method:'POST',
                url: baseUrl + '/users',
                headers:{
                    'Authorization': 'Bearer ' + accessToken
                },
                body:{
                    "name":createData.name,
                    "gender":createData.gender,
                    "email":emailText,
                    "status":createData.status
                }
    
            }).then((res)=>{
                cy.log(JSON.stringify(res))
                cy.log(JSON.stringify(res.body))
                expect(res.status).to.equal(201)
                expect(res.body).has.property('email',emailText)
                expect(res.body).has.property('name',createData.name)
                expect(res.body).has.property('gender',createData.gender)
                expect(res.body).has.property('status',createData.status)
                createData = res.body
                //New user info is saved in json file with id 
                cy.writeFile("cypress/fixtures/createUserData.json", JSON.stringify(createData))
            })
        })
        
        
    })

    it('Delete user test',()=>{
        
        cy.readFile("cypress/fixtures/createUserData.json").then((createData)=>{
            cy.request({
                method:'DELETE',
                url:baseUrl + '/users/'+createData.id,
                headers:{
                    'Authorization': 'Bearer ' + accessToken
                },
            }).then((res)=>{
                cy.log(JSON.stringify(res))
                cy.log(JSON.stringify(res.body))
                expect(res.status).to.equal(204)
            })
        })
         
    })

})