const validator=require('validator')
const isEmpty=require('./is-empty')
module.exports=function validatePostInput(data){
    const error={}
    data.text=!isEmpty(data.text)?data.text:""
    
    if(validator.isLength(data.text,{min:10,max:300})){
        error.text=' Post  must be between 10 and 300 characters';
    
    }
    if(validator.isEmpty(data.text)){
        error.text='Text field is required'
    }
    
return{
    error,
    isValid:isEmpty(error)
}
      
}