const validator=require('validator')
const isEmpty=require('./is-empty')

module.exports=function validateProfileInput(data){
    let error={}
    data.handle=!isEmpty(data.handle)?data.handle:""
    data.status=!isEmpty(data.status)?data.status:""
    data.skills=!isEmpty(data.skills)?data.skills:""


    if(validator.isLength(data.handle,{min:2,max:30})){
        error.handle=' handle must be between 2 and 30 characters';
    
    }
    
if(validator.isEmpty(data.handle)){
    error.handle='Profile handle  is required'
}
    
if(validator.isEmpty(data.status)){
    error.status='Status field  is required'
}
if(validator.isEmpty(data.skills)){
    error.skills='Skills field  is required'
}
if(!isEmpty(data.website)){
    if(!validator.isURL(data.website)){
        error.website='Not a valid Url'
    }
}

if(!isEmpty(data.youtube)){
    if(!validator.isURL(data.youtube)){
        error.youtube='Not a valid Url'
    }
}

if(!isEmpty(data.twitter)){
    if(!validator.isURL(data.twitter)){
        error.twitter='Not a valid Url'
    }
}
if(!isEmpty(data.facebook)){
    if(!validator.isURL(data.facebook)){
        error.facebook='Not a valid Url'
    }
}
if(!isEmpty(data.linkedin)){
    if(!validator.isURL(data.linkedin)){
        error.linkedin='Not a valid Url'
    }
}
if(!isEmpty(data.instagram)){
    if(!validator.isURL(data.instagram)){
        error.instagram='Not a valid Url'
    }
}



return{
    error,
    isValid:isEmpty(error)
}

}