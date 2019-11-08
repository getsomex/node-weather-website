const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();


// Define paths for express config
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectory));

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name : 'Mishal Ahmed'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Mishal Ahmed'
    });
});

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        name : 'Mishal Ahmed'
    });
});


app.get('/weather', (req,res) => {
    const address = req.query.address;
    if(!address){
       return res.send({error: 'Put your address'})
    }


    geoCode(address,(error,{latitude,longtitude,location}={}) => {
        // const {latitude,longtitude,location} = data;
        if(error){     
          return res.send({error})
        }  
        forecast(latitude, longtitude, (error, forecast) => {      
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast,
                address
            });
         })
    });


    
});

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})



app.get('/help/*', (req,res) =>{
    res.render('404',{
        errorName : 'Help article not found'
    });
});

app.get('*', (req,res) => {
    res.render('404',{
        title : '404',
        errorName : 'page not found'
    })
});


app.listen(3000, () => {
    console.log(' Server is up on port 3000')
});