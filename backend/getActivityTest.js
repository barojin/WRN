const rp = require('request-promise-native');
let options = {
    uri: 'http://127.0.0.1:1989/activities',
    json: true,
    method: "GET"
}

rp(options).then(function(data){
    console.log("getActivityTest");
    data.forEach(function(activity, i){
        console.log(`Activity ${i+1} name ${activity.name}, date: ${activity.dates}`);
    })
}).catch(function(err){
    console.log("not working");
})