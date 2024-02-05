const Product = require('../models/product');

const getAllProducts = async(req,res) => {
    const {company,name,featured,sort,select} = req.query;
    console.log(sort);
    const queryObject = {};

    if(company) {
        queryObject.company = company;
    }
    if(featured) {
        queryObject.featured = featured;
    }
    if(name) {
        queryObject.name = {$regex:name,$options:"i"};
    }

    let apiData =  Product.find(queryObject);

    if(sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix); 
    }
    
    //select = name,company
    if(select) {
        // let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix); 
    }
    
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;
    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObject);

    const Products = await apiData;
    res.status(200)
    .json({
        success:true,
        Products,
        nbHits:Products.length
    })
}

const getAllProductsTesting = async(req,res) => {
    //const myData = await Product.find(req.query).sort("name -price");
    const myData = await Product.find(req.query).select("name company");
    console.log(req.query);
    res.status(200)
    .json({
        success:true,
        myData
    })
}

module.exports = {
    getAllProducts,
    getAllProductsTesting
}