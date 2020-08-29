// Testing a JSON post interface
const request = require('request');

const postInfo = {url: 'http://127.0.0.1:5555/addThing',
                    method: "POST",
                    json: true,
                    body: {name: "13m kite", age: 2}
};

console.log("POST JSON test");
request(postInfo, function(error, res, body) {
    console.log(error);
    console.log(body);
});