const {generateId} = require('./id_generator');


module.exports.Id_modifier=(products)=>{
    //delete products.id;
    console.log("prd",typeof products);
    var productIdstring=products.primaryCategory.categoryId+products.title;
    var product_id=generateId(productIdstring);
    console.log("id",product_id);
    products.id=product_id;
    delete products._id;
    delete products.vendorId._id;
    var vendorIdstring=products.vendorId.name;
    var vendor_id=generateId(vendorIdstring);
    products.vendorId.id=vendor_id;
    
    console.log("imglen",products.images.length)
    for(var i=0 ;i<products.images.length;i++){
        delete products.images[i]._id;
        var prod_image=productIdstring+products.images[i].imageAltText;
        products.images[i].id=generateId(prod_image);
    }
    console.log("venlen",products.vendorId.images.length)
    for(var i=0 ;i<products.vendorId.images.length;i++){
        delete products.vendorId.images[i]._id;
        var vendor_image=vendorIdstring+products.vendorId.images[i].imageAltText;
        products.vendorId.images[i].id=generateId(vendor_image);
    }
    console.log("variantslen",products.variants.length)
    for(var i=0;i<products.variants.length;i++){
        var variantString=products.variants[i].vendorName+products.variants[i].category.categoryId;
        var variant_id=generateId(variantString);
        delete products.variants[i]._id;
        products.variants[i].id=variant_id;
        vendorIdstring=products.variants[i].vendorName;
        vendor_id=generateId(vendorIdstring);
        products.variants[i].vendorId=vendor_id;
        console.log("vid",vendor_id);
        console.log("var",variant_id);
        for(var j=0;j<products.variants[i].documents.length;j++){
            //delete products.variants[i].documents[j]._id;
            var doc_idstring=products.variants[i].id+j;
            
            var docid=generateId(doc_idstring);
            console.log("doc",docid);
            products.variants[i].documents[j].id=docid;
    
        }
    }

    return products;
}
