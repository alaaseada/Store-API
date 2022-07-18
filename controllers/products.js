const Product = require('../models/product')

const getAllProductStatic = async (req, res) => {
    // throw new Error("Testing express async errors.")
    const products = await Product.find({}).sort('-name price');
    res.status(200).json({ nbHits: products.length, products });
}

const getAllProducts = async (req, res) => {
    const { name, company, featured, fields, sort, numericFilters } = req.query;

    // Handle searching
    const queryObj = {}
    if (name) { queryObj.name = { $regex: name, $options: 'i'} }
    if (company) { queryObj.company = company }
    if (featured) { queryObj.featured = featured === 'true' ? true : false }

    // Handle numeric searching 
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',        
            '>=': '$gte',        
            '<=': '$lte',        
            '=': '$eq'    
        }
    
        const regEx = /\b(>|<|=|>=|<=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

        filters.split(',').forEach(element => {
            const [field, operator, value] = element.split('-');
            queryObj[field] = { [operator] : Number(value) }
        });
    }

    // Handle sorting 
    const query = Product.find(queryObj);
    if (sort) {
        query.sort(sort.split(',').join(' '));
     } else{
        query.sort('createdAt');
     }

    //  Handle filtering 
    if(fields){
        query.select(fields.split(',').join(' '));
    }

    // Handle paging 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await query.skip(skip).limit(limit).exec();
    res.status(200).json({ nbHits: products.length, products });
}

module.exports = {
    getAllProductStatic,
    getAllProducts
}