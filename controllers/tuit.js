const error_types   = require('./error_types');
const Tuit          = require('../Models/tuit');
const Like          = require('../Models/like');
const Follow        = require('../Models/follow');

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
    getAllUser: (req, res, next) => {
        Tuit.find({user_id: req.param('id')})
            .sort({created_at: 1})
            .then(data=>{
                res.json(data)
            });
    },
    get: (req, res, next) => {
        Tuit.find({_id:req.param('id')})
            .then(data=>{
                Like.find({tuit_id: req.param('id')})
                    .then(likes=>{
                        Tuit.find({ref:req.param('id'), type: "rt"})
                            .then(rts=>{
                                let value = {
                                    tuit: data,
                                    likes: likes.length,
                                    rts: rts.length
                                }
                                res.json(value);
                            })
                    })
            })
            .catch(err=>{res.json(err)}) 
    },
    delete: (req, res, next) => {
        Tuit.deleteOne({_id:req.param('id')})
             .then(data=>{
                res.json(data)
             })
             .catch(err=>{res.json(err)}) 
    },
    like: (req, res, next) => {
        Tuit.findOne({_id: req.body.tuit})
            .then(data=>{
                let document = new Like({
                    user_id: req.user.sub,
                    tuit_id: req.body.tuit
                }); 
                document.save()
                        .then(data => res.json({data: data}))
                        .catch(err => next(err));
            })
            .catch(err=>{res.json(err)});
    },
    unlike: (req, res, next) => {
        Like.deleteOne({_id:req.param('id'), user_id:req.user.sub})
            .then(data=>{
                res.json(data)
            })
            .catch(err=>{res.json(err)}) 
    },
    getLikes: (req, res, next) => {
        Like.find({tuit_id: req.param('id')},{tuit_id: 1})
            .then(data=>{
                tuitsIDs = data.map(function (data) { return data.tuit_id; });
                Tuit.find({
                            '_id': { $in: tuitsIDs}})
                    .sort({created_at: -1})
                    .then(likes=>{
                        res.json(likes);
                    })
                    .catch(err=>{res.json(err)});
            });
    },
    getLikesUser: (req, res, next) => {
        Like.find({user_id: req.param('id')},{tuit_id: 1})
            .then(data=>{
                tuitsIDs = data.map(function (data) { return data.tuit_id; });
                Tuit.find({
                            '_id': { $in: tuitsIDs}})
                    .sort({created_at: -1})
                    .then(likes=>{
                        res.json(likes);
                    })
                    .catch(err=>{res.json(err)});
            });
    },
    getTimeline: (req, res, next) => {
        Follow.find({follow_id: req.user.sub, status: true})
              .then(follows=>{
                  console.log(follows);
                  followsIDs = follows.map(function (follows) { return follows.user_id; });
                  Tuit.find({'user_id': { $in: followsIDs}})
                      .then(tuits=>{
                          res.json(tuits)
                      })
                      .catch(err=>{res.json(err)});
              })
              .catch(err=>{res.json(err)});
    }
}
module.exports = controller;