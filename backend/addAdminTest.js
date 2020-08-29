const rp = require('request-promise-native');
const verbose = false;
const cookieJar = rp.jar();
let baseURL = 'http://127.0.0.1:1989';

let loginAdmin = {
    url: baseURL + '/login',
    method: "POST",
    json: true,
    body: {email: "tirrivees1820@outlook.com", password: "49OqspUq"},
    jar: cookieJar
};

let loginMember ={
    url: baseURL+'/login',
    method: "POST",
    json: true,
    body: {email: "chihuahua1899@gmail.com", password: "'E`Gj3iJ"},
    jar: cookieJar
};

let logout = {
    url: baseURL + '/logout',
    json: true,
    jar: cookieJar
};


let activities = {
    url: baseURL+'/activities',
    method: "GET",
    json: true,
    jar: cookieJar
};


let addActivity = {
    url: baseURL+'/addActivity',
    method: "POST",
    json: true,
    body: {name: "added one", dates: ["May", "july"]},
    jar: cookieJar
};

function allCookies(){
    return cookieJar.getCookieString(baseURL);
}

async function someTest(){
    let res;
    console.log('Add Activity Test 1: Admin Login');
    try{
        res = await rp(loginAdmin);
        console.log(`Admin login, Cookies: ${allCookies()}`);
        res = await rp(activities);
        console.log(`Number of activities: ${res.length}\n`);
        res = await rp(addActivity);
        console.log(`After add number of activities: ${res.length}\n`);
        res = await rp(logout);
        console.log(`After logout, Cookies: ${allCookies()}\n`);
    } catch (error){
        console.log(`${error}`);
    }
    
    console.log("Add Test 2: Member Login");
    try {
        res = await rp(loginMember);
        console.log(`Member login, Cookies: ${allCookies()}`);
        res = await rp(activities);
        console.log(`Number of activities: ${res.length}\n`);
        res = await rp(addActivity);
        console.log(`After add number of activities: ${res.length}\n`);
        res = await rp(logout);
        console.log(`After logout, Cookies: ${allCookies()}\n`);
    } catch (error) {
        console.log(`Member add activity error: ${error}`);
        res = await rp(activities);
        console.log(`Number of activities: ${res.length}\n`);
        res = await rp(logout);
        console.log(`After logout, Cookies: ${allCookies()}\n`);
    }
    console.log(`After Login test 2, Cookies: ${allCookies()}\n`);
    
    console.log("Add Activity Test 3: Guest");
    try {
        res = await rp(activities);
        console.log(`Number of activities: ${res.length}\n`);
        res = await rp(addActivity);
        console.log(`After add number of activities: ${res.length}\n`);
        res = await rp(loginBadPass);
    } catch (error) {
        console.log(`Bad password login error: ${error}\n`);
    }
        console.log(`After Activity test 3, Cookies: ${allCookies()}\n`);
}

someTest();