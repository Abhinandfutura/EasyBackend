var express = require('express');
var router = express.Router();
var db=require('./Config/Connection')
var bcrypt=require('bcrypt')
var Objectid=require('mongodb').ObjectId
/* GET home page. */

const salt=10;
router.post('/signup', (req,res,next)=>{
  console.log(req.body);

  db.get().collection('userData').findOne({email:req.body.email}).then((result)=>{
   
    if(result){
   
          res.json({message:'user is already exist , Please change Email'})
    }
     
    else{
    


      bcrypt.genSalt(salt,(err,s)=>{

        bcrypt.hash(req.body.password1,s,(err,pass)=>{
          console.log(pass);
          req.body.password1=pass;
          
          db.get().collection('userData').insertOne(req.body).then((result)=>{
      
            console.log(result);
            res.json(result)
            
            });
      
        })
      })
      
      


    }
    })
})

router.post('/',(req,res,next)=>{

  console.log(req.body);
 
  db.get().collection('userData').findOne({email:req.body.email}).then((result)=>{
   
    if(result){
      bcrypt.compare(req.body.password,result.password1).then((status)=>{
        if(status){
          res.json({message:'Login Successful'})
        }
        else{
          res.json({message:'Password does not match'})
        }
      })
    }
    else
    res.json({message:'No user found'})
    })
  })



router.post('/addproduct',(req,res,next)=>{
  console.log(req.body);

  db.get().collection('Products').insertOne(req.body).then((result)=>{
    res.json({message:'Product Added successfully'})
  })
})

router.get('/viewproducts',(req,res,next)=>{

  db.get().collection('Products').find().toArray().then((result)=>{
    res.json(result);
   

  })
})

router.get('/selectedCategory/:data',(req,res,next)=>{
 
data=req.params.data;
  db.get().collection('Products').find({'product.category':data}).toArray().then((result)=>{

    res.json(result)
    console.log(result);
  })
 
})
router.get('/searchdata/:search_itm',(req,res,next)=>{
  db.get().collection('Products').find({'product.itm_name':req.params.search_itm}).toArray().then((result)=>{
    res.json(result)
  })
})
router.get('/update/:id',(req,res,next)=>{

  db.get().collection('Products').findOne({_id:Objectid(req.params.id)}).then((result)=>{
    res.json(result)
  })
})

router.get('/select/:filter',(req,res,next)=>{

  db.get().collection('Products').find({'product.category':req.params.filter}).toArray().then((result)=>{
    res.json(result)
  })
})

router.get('/searchitem/:searchvalue',(req,res,next)=>{
  db.get().collection('Products').find({'product.itm_name':req.params.searchvalue}).toArray().then((result)=>{
    res.json(result)
  })

})


router.get('/orderdata/:id',(req,res,next)=>{

  console.log("hii",req.params.id);
  db.get().collection('Products').findOne({_id:Objectid(req.params.id)}).then((result)=>{
    res.json(result)
    console.log("hii",result);
  })
})

module.exports = router;
