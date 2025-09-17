// http://localhost:4000 <--- This is a browser path to check node and mongo is work and both are connected or not//
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// Database Connection with Mongoose//
mongoose.connect("mongodb+srv://VanshDhiman:1234567890@cluster0.aawtg66.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

//API Creation //
app.get("/",(req,res)=> {
  res.send("Express App is Running")
})

//Creating API For detailing Products//a
app.post('/removeproduct',async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed");
  res.json({
    success:true,
    name:req.body.name
  });
})
// Creating API //
app.get('/allproducts',async(req,res)=>{
  let products = await Product.find({});
  res.send(products);
})

//creating endpoint for user login 
app.post('/login',async (req,res)=>{
  let user = await Users.findOne({email:req.body.email});
  if (user){
    const passCompare = req.body.password === user.password;
    if (passCompare){
      const data ={
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data,'secret_ecom');
      res.json({success:true,token})
    }
  else
    {
    res.json({success:false,errors:"Wromg Password"});
  }
}
  else{
    res.json({success:false,errors:"Wrong Email Id"})
  
  }
})


app.listen(port,(error)=> {
  if (!error) {
    console.log("server Running on port "+port)
  }
  
})
// Image Storage Engine//
const storage = multer.diskStorage({
  destination: './upload/image',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Schema creating for User model
const Users =mongoose.model('Users',{
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,
  }
})

//Creating Endpoint
app.post('/signup', async (req,res)=>{
  let check = await Users.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,errors:"existing user with same email address"})
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i]=0;
  }
  const user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
  })
  await user.save();

  const data = {
    user:{
      id:user.id
    }
  }
  const token = jwt.sign(data,'secret_ecom');
  res.json({success:true,token})
})

const upload = multer({ storage: storage });
// creating Upload Endpoint for images
app.use('/image', express.static('./upload/image'));
app.post("/upload", upload.single('product'), (req, res) => { 
     res.json({
      success:1,
      image_url:`http://localhost:${port}/image/${req.file.filename}`
     })
});
//Schema for Creating Products//
const Product = mongoose.model("Product",{
   id:{
    type: Number,
    required: true,
   },
   name:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  new_price:{
    type:Number,
    required:true,
  },
  old_price:{
    type:Number,
    required:true
  },
  date:{
    type:Date,
    default:Date.now,
  },
  available:{
    type:Boolean,
    default:true,
  },
  image:{ type:String, required:false }  // move here, remove duplicate below
})

//Creating API For detailing Products//
app.post('/removeproduct',async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed");
  res.json({
    success:true,
    name:req.body.name
  });
})


// Creating API for get products data //
app.get('/allproducts',async(req,res)=>{
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
})

// Fixed /addproduct route
app.post('/addproduct',async (req,res)=>{
  let products = await Product.find({});
  let id;
  if(products.length>0)
  {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }
  else{
    id = 1;
  }
  const product = new Product ({
    id:req.body.id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
  });

console.log(product);
await product.save();
console.log("Saved");
res.json({
  success:true,
  name:req.body.name,
   })
})