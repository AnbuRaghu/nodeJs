const chai=require('chai')

let mocha =require('mocha');
let describe=mocha.describe
let it=mocha.it;
let should=require('should')
let chaiHttp=require('chai-http')
let expect=chai.expect
chai.use(chaiHttp)
describe('Auth module', () => {
    it('should register the user',(done)=>{
        chai.request('http://localhost:5000')
        .post('/api/users/register')
        .send({
            name:'Anbu',
            email:"anbu@gmail.com",
            password:"123456",
            password2:"123456"
        })
        .end((err,res)=>{
        should.exist(res.body)
        done()
        })
        
       

        })
        it('should do login',()=>{
            chai.request('http://localhost:5000')
        .post('/api/users/register')
        .send({
            name:'Anbu',
            email:"anbu@gmail.com",
            password:"123456",
            password2:"123456"
        })
        .end((err,res)=>{
            should.exist(res.body.token)
            done()
            })

    })
    
})
