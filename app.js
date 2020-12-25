const express = require('express')
const path = require('path')
const app = express()
const port = 80

// for storing the data from contact page (from Mongoose documentation )
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDB', {useNewUrlParser: true, useUnifiedTopology: true});

 //const bodyparser = require("body-parser") // after installing body-parser using "npm i body-parser"
// body-paresr is a middleware 


const contactSchema = new mongoose.Schema({
    firstname: String ,  // for defining schema
    lastname: String,
    country: String,
    subject: String

  });
const contact = mongoose.model('contact', contactSchema);



app.use('/static', express.static('static'))
// To serve static files such as images, CSS files, and JavaScript files, use the express.static 
// built-in middleware function in Express.
app.use(express.urlencoded())


//PUG specific tusk 
app.set('view engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // set the views directory 


//ENDPOINTS 
app.get('/', (req, res) => {
    const con = "This is the best tutorial"
    const params = {}
    res.status(200).render('index.pug', params)

})
app.get('/contact', (req, res) => {
    const con = "This is the best tutorial"
    const params = {}
    res.status(200).render('contact.pug', params)

})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body)
    myData.save().then(()=>{
        res.send("your Form has been submitted")
    }).catch(()=>{
        res.status(400).send("Form has not been submitted . try again later")
    })
    // const params = {}
    // res.status(200).render('contact.pug', params)

})


//STARTING the server
app.listen(port, () => {
    console.log(`the application startd at port ${port}`)
})



