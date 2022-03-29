// const Helper = require('./Helper');
const db = require('../config/db/DBconnection');
const axios = require('axios');

exports.getmenu = async (req, res, next) => {    
    const product = await db.collection('products').get();
    var data = [];
    product.forEach((doc) => {
        data.push({id:doc.id,...doc.data()})
    }); 
    res.render('index',{data});
}
// exports.add = async (req, res, next) => {  
//     var datas = [] , item;  
//     axios('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/shoes.json')
//     .then((resp) =>{
//         resp.data.shoes.forEach((data)=>{
//             item = {
//                 color:[ 'rgb(255, 0, 0)','rgb(0, 255, 21)','rgb(0, 119, 255)','rgb(255, 217, 0)'],
//                 description: data.description,
//                 name: data.name,
//                 price: data.price,
//                 product_img: [data.image],
//                 size: ['36','37','38','39','40','41','42','43']
//             }
//             const A = async ()=>{
//                 await db.collection('products').add(item);
//             }
//             A();
//             datas.push(item);
//         })
//         res.json(datas);
//     })
//     const user = await db.collection('products').get();
//         user.forEach((doc) => {
//             doc.data().product_img.add('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-shield-mens-running-shoe-24FBGb__1_-removebg-preview.png')
//             console.log(doc.data());

//         });
// }