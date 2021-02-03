const validator=require('validator')
const isEmpty=require('./is-empty')
module.exports=function validateLoginInput(data){
    let error={}
    data.name=!isEmpty(data.name)?data.name : ''
    data.email=!isEmpty(data.email)?data.email : ''
    data.password=!isEmpty(data.password)?data.password: ''
    data.password2=!isEmpty(data.password2)?data.password2: ''

    if(validator.isEmpty(data.email)){
        error.email='Email is required'
    }
    if(!validator.isEmail(data.email)){
        error.email='Email is invalid'
    }
    if(validator.isEmpty(data.password)){
        error.password='Password is required'
    }
    return{
        error,
        isValid:isEmpty(error)
    }
    

}