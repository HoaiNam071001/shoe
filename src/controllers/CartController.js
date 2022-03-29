// const Helper = require('./Helper');
const db = require('../config/db/DBconnection');

exports.get = async (req, res, next) => {
    if(req.session.user){
        const item = await db.collection('users').get();
        var i= true;
        item.forEach((doc) => {
            if(req.session.user === doc.id){
                var data =doc.data().cart, sum=0;
                doc.data().cart.forEach((cart) =>{
                    sum+= cart.quantity*cart.price;
                })
                data = {'cart':data,'sum':sum};
                i = false;
                res.render('pages/cart',{data});
            }
        });
        if(i) res.json({message: 'Vui lòng đăng nhập'});
    }
    else res.render('pages/cart');
}
exports.add = async (req, res, next) => {
    try{
        if(!req.params.id){
            throw 'Fail';
        }
        const it = await db.collection('users').doc(req.session.user).get();
        var carts = it.data().cart;
        var i=true;

        carts.forEach((cart) => {
            if(req.params.id === cart.id && req.query.color === cart.color && req.query.size === cart.size){
                cart.quantity++;
                i=false;
            }
        })

        if(i){
            var cart = [
                {
                    name: req.query.name,
                    img:req.query.image,
                    color:req.query.color,
                    size:req.query.size,
                    price:req.query.price,
                    id:req.params.id,
                    quantity:1
                },...carts];
            db.collection('users').doc(req.session.user).update({'cart': cart});
        }    
        else   {
             db.collection('users').doc(req.session.user).update({'cart': carts});
        } 
        res.json("success");
    }
    catch(err) {
        res.send(err);
    }
}
exports.giam = async (req, res, next) => {
    try{
        if(req.session.user){
            const item = await db.collection('users').doc(req.session.user).get();
            var carts = item.data().cart, sum=0,length = 0, i=0, k=0;
            carts.forEach((cart) => {
                if(req.query.id === cart.id && req.query.color === cart.color && req.query.size === cart.size){
                    cart.quantity--;
                    length = cart.quantity;
                    k = i;
                }
                i++;
                sum += cart.quantity*cart.price;
            });
            if(length === 0) carts.splice(k, 1);


            db.collection('users').doc(req.session.user).update({'cart': carts});
            res.json({'length':length,'sum':sum});
        }
        else res.json({message: 'Vui lòng đăng nhập'});
    }
    catch(err) {
        res.send(err);
    }
    
}
exports.tang = async (req, res, next) => {
    try{
        if(req.session.user){
            const item = await db.collection('users').doc(req.session.user).get();
            var carts = item.data().cart, sum=0,length = 0;
            carts.forEach((cart) => {
                if(req.query.id === cart.id && req.query.color === cart.color && req.query.size === cart.size){
                    cart.quantity++;
                    length = cart.quantity;
                }
                sum += cart.quantity*cart.price;
            });
            db.collection('users').doc(req.session.user).update({'cart': carts});
            res.json({'length':length,'sum':sum});
        }
        else res.json({message: 'Vui lòng đăng nhập'});
    }
    catch(err) {
        res.send(err);
    }
}