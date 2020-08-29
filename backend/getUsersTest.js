const rp = require('request-promise-native');
const cookieJar = rp.jar();

let loginAdmin = {
    url: 'http://127.0.0.1:1989/login',
    method: "POST",
    json: true,
    body: {email: "tirrivees1820@outlook.com", password: "49OqspUq"},
    jar: cookieJar
};

let getLogout = {
    url: 'http://127.0.0.1:1989/logout',
    json: true,
    jar: cookieJar
};

let memberLogin ={
    url: 'http://127.0.0.1:1989/login',
    method: "POST",
    json: true,
    body: {email: "chihuahua1899@gmail.com", password: "'E`Gj3iJ"},
    jar: cookieJar
};

let getUsers = {
    uri: 'http://127.0.0.1:1989/getUsers',
    json: true,
    method: "POST",
    jar: cookieJar
};

let getActi = {
    url: 'http://127.0.0.1:1989/activities',
    method: "GET",
    json: true,
    jar: cookieJar
};

rp(loginAdmin).then(function(data){
    console.log("Get Users Test 1: Admin Login");
    console.log(`Admin login, Cookies: ${cookieJar.getCookieString(loginAdmin.url)}`);
    return rp(getUsers);
}).then(function(data){
    console.log(`Number of activities: ${data.length}`);
    return rp(getLogout);  
}).then(function(data){
    console.log(`After logout, Cookies: ${cookieJar.getCookieString(getLogout.url)}`);
    
    return rp(memberLogin);    
}).then(function(data){
    console.log("Get Users Test 2: Member Login");
    console.log(`Member login, Cookies: ${cookieJar.getCookieString(memberLogin.url)}`);
    return rp(getUsers);
}).catch(function(err){
    console.log("Get users after member login")
    console.log(`Member get user error: ${err}`);
    return rp(getLogout);
}).then(function(data){
    console.log(`After logout, Cookies: ${cookieJar.getCookieString(getLogout.url)}`);
    
    console.log("\n Get users Test 3: Guest");
    return rp(getUsers);
}).catch(function(err){
    console.log(`Guest Get Users error: ${err}`);
    return rp(getActi);
}).then(function(data){
    console.log(`Get users Test 3, Cookies: ${cookieJar.getCookieString(getActi.url)}`);
}).catch(function(err){
    console.log(`Err ${err} `);
});




