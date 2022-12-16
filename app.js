const express       = require('express')
const bodyParser    = require('body-parser')
const mongojs       = require('mongojs')
const port          = process.env.port || 9696
const app           = express()
const db            = mongojs('acme', ['products', 'customers'])

app.use(bodyParser.json())


// Home page route
app.get('/', (req, res) => {
    res.send('Please use /api/products')
})


// Fetch All Products
app.get('/api/products', (req, res) => {
    db.products.find((err, docs) => {
        if (err)
        {
            res.send(err)
        }

        console.log("Product Listing Found")
        res.json(docs)
    })
    //res.send('Listing of all products')
})


// Fetch Single Product
app.get('/api/products/:id', (req, res) => {
    db.products.findOne({_id: mongojs.ObjectId(req.params.id)},
        (err, doc) => {
        if (err)
        {
            res.send(err)
        }
        console.log("Product Listing Found")
        res.json(doc)
    })
})


// Add New Product
app.post('/api/products', (req, res) => {
    db.products.insertOne(req.body, (err, doc) => {
        if (err)
        {
            res.send(err)
        }
        console.log("Product Succesfully Added")
        res.json(doc)
    })
})


// Update Single Product
app.put('/api/products/:id', (req, res) => {
    res.send('Updated single product')
})


// Update Single Product
app.patch('/api/products/:id', (req, res) => {
    res.send('Updated single product')
})


// Delete Single Product
app.delete('/api/products/:id', (req, res) => {
    db.products.remove({_id: mongojs.ObjectId(req.params.id)},
        (err, doc) => {
        if (err)
        {
            res.send(err)
        }
        console.log("Product Listing Deleted")
        res.json(doc)
    })
})



app.listen(port, () => {
    console.log(`App running on port ${port}`)
})