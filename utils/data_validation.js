const validator = require("email-validator");
const _ = require("lodash");



function recurse(obj){
    // console.log("obj",obj);
    
        if(_.isArray(obj)){
            for(var i=0;i<obj.length;i++){
                recurse(obj[i]);
            }
            
        }
        else if(_.isObject(obj)){
            for(var key in obj){
                if(!key.localeCompare("images")){
                
                    if(_.isArray(obj[key])){
                        arr=[];
                        for(var i=0;i<obj[key].length;i++){
                            if(obj[key][i].imageUrl!=null){
                            
                                var str_array = obj[key][i].imageAltText.split(',');
                                str_array.reverse();
                                var revstr=str_array.join(",");
                                obj[key][i].imageAltText=revstr;
                                arr.push(obj[key][i]);
                                
                            }
                            
                        }
                        obj[key]=arr;
                    
                    }
                    else if(_.isObject(obj[key]) && obj[key].imageUrl===null){
                        delete obj.key;
                    }
                    else if(_.isObject(obj[key]) && obj[key].imageUrl!==null){
                        var str_array = obj[key].imageAltText.split(',');
                        str_array.reverse();
                        var revstr=str_array.join(",");
                        obj[key].imageAltText=revstr;
                    }
                }
                else if(_.isObject(obj[key])){
                    recurse(obj[key]);
                }
                
            }
            
            
        }
    
    
    return obj;
}


function trimdata(obj){
    _.forEach(obj,function(val,key){
        if(_.isString(key)){
            var newkey = key.trim();
            delete obj[key];
            obj[newkey]=val;
        }
        
        if(_.isArray(obj[newkey])){
            for(var i=0;i<obj[newkey].length;i++){
                trimdata(obj[newkey]);
            }
            
        }
        else if(_.isObject(obj[newkey])){
            trimdata(obj[newkey]);
        }
        
    })
    return obj;
}

module.exports.applicationFieldValidator=(product)=>{
    for(var i=0;i<product.variants.length;i++){
        var new_application=[];
        if(product.variants[i].application.indexOf("Bedroom")>-1){
            new_application.push("Bedroom");
        }
        if(product.variants[i].application.indexOf("Living Room")>-1){
            new_application.push("Living Room");
        }
        if(product.variants[i].application.indexOf("Office")>-1){
            new_application.push("Office");
        }
        product.variants[i].application=new_application;
    }
    return product;
}

//recursively searching for image field and modifying it values as mentioned
module.exports.imageAltTextvalidator=(product)=>{
    var obj=recurse(product)
    return obj;
}

module.exports.emailValidator=(product)=>{
    console.log("email",product.vendorId.email);
    return validator.validate(product.vendorId.email);
}

module.exports.spaceValidator=(product)=>{
    return trimdata(product);
}