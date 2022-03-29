// const Helper = require('./Helper');
const db = require('../config/db/DBconnection');

exports.getItem = async (req, res, next) => {
    const item = await db.collection('products').get();
    var i = true;
    item.forEach((doc) => {
        if(doc.id === req.params.name){
            i = false;
            var data ={id: doc.id,...doc.data()} ;
            res.render('pages/product',{data}); 
            return;
        }
    });
    if(i) res.json('Invalid!');
}