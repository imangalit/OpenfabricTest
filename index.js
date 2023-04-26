const express = require('express')
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const Product = require('./productModel')
const app = express()
var cors = require('cors')
app.use(express.json())
app.use(cors())

const secretKey = "5d44f28e5c9b58508009021a261691b28eaf1c10df806ac7baaa5f71dae77529fd312165f0fc0cd19092f0feccdc2b64b1d0bcd674d336431ffab1fbbce17343"
const url = "mongodb+srv://admin:admin@cluster0.yld5ddr.mongodb.net/test"

async function connect () {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch {
        console.error(error);
    }
}
connect();

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username != "admin" || password != "admin") {
        res.status(401).json({ error: 'Invalid credentials' });
    }
    else {
        const token = jwt.sign({ username }, secretKey);
        res.json({ token });
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden' });
      }
  
      req.user = user;
      next();
    });
  };

app.get('/products', async(req, res) => {
    console.log("getting")
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
});

app.get('/products/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', authenticateToken, async(req, res) => {
    console.log("adding")
    try {
        const product = await Product.create(req.body)
        console.log(product)
        res.status(200).json(product);
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', authenticateToken, async(req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message: 'can not find any product with ID ${id}'})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.put('/products/:id', authenticateToken, async(req,res) => {
    try {
        const id = req.params.id
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product) {
            return res.status(400).json({message: 'can not find product'})
        } 
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    }
    
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on localhost with port ${PORT}`)
})