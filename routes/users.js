var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
var db=require('../routes/Config/Connection')
var Objectid=require('mongodb').ObjectId
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

router.post('/category',(req,res,next)=>{
   
    db.get().collection('AddCategory').insertOne(req.body).then((result)=>{
        res.json(result)
        console.log(result);
    })
})

router.get('/getData',(req,res)=>{
   
    db.get().collection('AddCategory').find({}).toArray().then((result)=>{
        res.json(result)
        console.log(result);
    })
})
router.get('/del/:id',(req,res,next)=>{
  

    db.get().collection('AddCategory').deleteOne({_id:Objectid(req.params.id)}).then((result)=>{

       console.log("deleted data",result)
    })

})
router.post('/updat',(req,res,next)=>{

    console.log(req.body);
    db.get().collection('AddCategory').updateOne({_id:Objectid(req.body.dataId)},{$set:{list:req.body.updateData}})
    .then((result)=>{
        console.log("Updated",result);
    })
  
})




module.exports = router;
