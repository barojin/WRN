const rp = require('request-promise-native');
const verbose = false;
const cookieJar = rp.jar();

let rqgood = {
    url: 'http://127.0.0.1:1989/login',
    method: "POST",
    json: true,
    body: {email: "tirrivees1820@outlook.com", password: "49OqspUq"},
    jar: cookieJar
};

let getAct = {
    url: 'http://127.0.0.1:1989/activities',
    json: true,
    jar: cookieJar
};

let getLogout = {
    url: 'http://127.0.0.1:1989/logout',
    json: true,
    jar: cookieJar
};

const badid = Object.assign({}, rqgood, {body: {email: "xxx", password: "49OqspUq"}})

const badpw = Object.assign({}, rqgood, {body: {email: "tirrivees1820@outlook.com", password: "7809uad"}})

rp(getAct).then(function(data){
    console.log("Login Test 1: Good Login");
    console.log(`Called activities, Cookies: ${cookieJar.getCookieString(getAct.url)}`);
    return rp(rqgood);
}).then(function(data){
    console.log(`Good login test result: ${JSON.stringify(data)}`);
    console.log(`\n After good login, Cookies: ${cookieJar.getCookieString(rqgood.url)}`);
    return rp(getLogout);
}).then(function(data){
    console.log(`\n After logout, Cookies: ${cookieJar.getCookieString(getLogout.url)}`);
    return rp(getAct);
}).then(function(data){
    console.log("Login Test 2: Bad email");
    console.log(`Called activities, Cookies: ${cookieJar.getCookieString(getAct.url)}`);
    return rp(badid);
        
}).catch(function(err){
    console.log(`Bad email login error: ${err}`)
    console.log(`After login test 2, Cookies: ${cookieJar.getCookieString(badid.url)}`);
    return rp(getAct);
}).then(function(data){
    console.log("Login Test 3: Bad pw");
    console.log(`Called activities, Cookies: ${cookieJar.getCookieString(getAct.url)}`);
    return rp(badpw);
        
}).catch(function(err){
    console.log(`Bad password login error: ${err}`)
    console.log(`After login test 3, Cookies: ${cookieJar.getCookieString(badpw.url)}`);
});
