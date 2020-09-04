const error_types   = require('./error_types');
const Tuit       = require('../Models/tuit');

let controller = {
    create: (req, res, next) => {
        if (req.body.msg == undefined){
            throw new error_types.InfoError('Message is required');
        }else{
            let document = new Tuit({
                user_id: req.user.sub,
                msg:     req.body.msg,
                ref:     req.body.ref   || '',
                type:    req.body.type  || 'tuit'
            }); 
            document.save().then(data => res.json({data: data})).catch(err => next(err));
        }
    },
    getAll: (req, res, next) => {
        Tuit.find({user_id: req.user.sub})
            .sort({created_at: 1})
            .then(data=>res.json(data));
    },
    get: (req, res, next) => {
        Tuit.find({_id:req.param('id')})
            .then(data=>{res.json(data)})
            .catch(err=>{res.json(err)}) 
    },
    delete: (req, res, next) => {
        Tuit.deleteOne({_id:req.param('id')})
             .then(data=>{
                res.json(data)
             })
             .catch(err=>{res.json(err)}) 
    }
}

module.exports = controller;