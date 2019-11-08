const request = require('request');


const forecast = (latittude,longtitude,callback) => {
    const url = `https://api.darksky.net/forecast/bdd88bc0c4fced41aa98db17073dc762/${latittude},${longtitude}`;
    request({url,json: true},(error,{body}) => {
        if(error){
            callback('Unable to find weatrher data',undefined)
        } else if (body.error){
            callback('Unable to find location',undefined)
        } else {
            const {temperature,precipProbability} = body.currently;
            callback(undefined,
            
            body.daily.data[0].summary === undefined? 'No data' :  body.daily.data[0].summary +` It is currently ${temperature} degrees out there.There is ${precipProbability} chance of rain.`)
        }
    });
};

module.exports = forecast;

