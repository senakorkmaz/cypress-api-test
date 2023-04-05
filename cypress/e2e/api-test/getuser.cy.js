/// <reference types="cypress" />
import data from '../../fixtures/data.json';

describe('get api user tests',()=>{
    
    let baseUrl = data["BASEURL"]
    let accessToken = data["TOKEN"]
    let id = data["USERID"]

    it('Get users',()=>{
        cy.request({
            method:'GET',
            url: baseUrl+'/users',
            headers:{
                'authoriation' : "Bearer " + accessToken
            }
        }).then((res)=>{
            expect(res.status).to.equal(200)
        })
    })

    it('Get user by id',()=>{
        cy.request({
            method:'GET',
            url:baseUrl+'/users/'+id,
            headers:{
                'authoriation' : "Bearer " + accessToken
            }
        }).then((res)=>{
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('Shashi Kaniyar')
        })
    })
})