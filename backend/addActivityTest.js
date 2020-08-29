
const rp = require('request-promise-native');

let rqgood = {url: 'http://127.0.0.1:1989/activities',
                    method: "POST",
                    json: true,
                    body: {name: "added one", dates: ["May", "july"]}
};

let rqget = {url: 'http://127.0.0.1:1989/activities',
                    method: "GET",
                    json: true
};

let rqbad = {url: 'http://127.0.0.1:1989/activities',
                    method: "POST",
                    json: true,
                    body: {name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", dates: ["May", "july"]}
};

rp(rqgood).then(function(data){
    console.log("Initial Get of activities");
    console.log(`Currently ${data.length} activities`);    
}).catch(function(err){
    console.log(`Error: ${err}`);
});

rp(rqget).then(function(data){
    console.log("After First Good Activity Post");
    console.log(`Currently ${data.length} activities`);
    data.forEach(function(act, i){
        console.log(`Activity ${i+1} name ${act.name}, date: ${act.dates}`)
    });
}).catch(function(err){
    console.log(`Error: ${err}`);
});

rp(rqbad).then(function(data){
    console.log("After First Bad Activity Post");
    console.log(`Currently ${data.length} activities`);
}).catch(function(err){
    console.log(`Error: ${err}`);
});

rp(rqgood).then(function(data){
    console.log("Another Good Activity Post");
    console.log(`Currently ${data.length} activities`);
    data.forEach(function(act, i){
        console.log(`Activity ${i+1} name ${act.name}, date: ${act.dates}`)
    });
}).catch(function(err){
    console.log(`Error: ${err}`);
})


