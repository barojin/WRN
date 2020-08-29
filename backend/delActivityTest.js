const rp = require("request-promise-native");
const verbose = false;
const cookieJar = rp.jar();
let loginURL = 'http://127.0.0.1:1989/login';

let loginAdmin = {
    uri: loginURL,
    json: true,
    method: 'POST',
    body: {
        'email': 'tirrivees1820@outlook.com',
        'password': "49OqspUq"
    },
    jar: cookieJar
};

const baseURL = 'http://127.0.0.1:1989/activities';

let initialGet = {
    uri: baseURL,
    json: true,
    method: "GET",
    jar: cookieJar
};

let firstDel = {
    uri: null,
    json: true,
    method: "DELETE",
    jar: cookieJar
};

let badDel ={
    uri: 'http://127.0.0.1:1989/activities/HaHa',
    json: true,
    method: 'DELETE',
    jar: cookieJar
};

let anotherGoodDel = {
    uri: null,
    json: true,
    method: "DELETE",
    jar: cookieJar
};

function printActivities(data){
    console.log(`Currently ${data.length} activities`);
    if (!verbose){
        return;
    }
    data.forEach(function(v, i){
        console.log(`Activity ${i+1} name ${v.name}, date: ${v.dates}`);
    });
};

async function delTest(){
    let id1, id2;
    let data = await rp(loginAdmin);
    data = await rp(initialGet);
    console.log("Initial Get of activities");
    id1 = data[0]._id;
    id2 = data[1]._id;
    firstDel.uri = baseURL + '/' + id1;
    anotherGoodDel.uri = baseURL + '/' + id2;
    data = await rp(firstDel);
    console.log("After First Good Activity Deletion");
    printActivities(data);
    
    try {
        await rp(badDel);
    } catch (err){
        console.log("After First Bad Acitivity delete");
        console.log(`Error: ${err}`);
    }
    data = await rp(anotherGoodDel);
    console.log("After Another Good Activity Delete");
    printActivities(data);

}

delTest().catch(err=> console.log(`Error: ${err}`));