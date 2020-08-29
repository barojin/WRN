const rp = require('request-promise-native');
const verbose = false;
const cookieJar = rp.jar();
let baseURL = 'http://127.0.0.1:1989';

let goodApp1 = require('./applicant1.json');
let badApp2 = require('./badApplicant2.json');

let goodApply1 = {
    uri: baseURL + '/applicants',
    json: true,
    method: "POST",
    body: goodApp1
};
let badApply2 = {
uri: baseURL + '/applicants',
json: true,
method: "POST",
body: badApp2
};

let loginMember ={
    url: baseURL+'/login',
    method: "POST",
    json: true,
    body: {email: "chihuahua1899@gmail.com", password: "'E`Gj3iJ"},
    jar: cookieJar
};

let goodtest = {
    url: baseURL + '/applicants',
    method: "POST",
    json: true,
    body: {"name": "hojin", "email": "hnam5@horizon.csueastbay.edu", "sailnumber-brand": "nike", "level": 0, "comments": "hello good to see you"},
    jar: cookieJar
};

let goodtest2 = {
    url: baseURL + '/applicants',
    method: "POST",
    json: true,
    body: {"name": "haroo", "email": "okok@horizon.csueastbay.edu", "sailnumber-brand": "nike", "level": 0, "comments": "hello good to see you"},
    jar: cookieJar
};

let badtest = {
    url: baseURL + '/applicants',
    method: "POST",
    json: true,
    body: {"name": "hojin", "email": "hnamorizon.csueastbay.edu", "sailnumber-brand": "nike", "level": 0, "comments": "hello good to see you"},
    jar: cookieJar
};

let badtest2 = {
    url: baseURL + '/applicants',
    method: "POST",
    json: true,
    body: {"name": "hojin", "email": "hnam5@csueastbay.edu", "sailnumber-brand": "nike", "level": -2, "comments": "hello good to see you"},
    jar: cookieJar
};

function allCookies(){
    return cookieJar.getCookieString(baseURL);
}

function print(data){
    if (!verbose){
        return;
    }
    data.forEach(function(v, i){
        console.log(`Activity ${i+1} name ${v.name}, date: ${v.dates}`);
    });
};

//rp(loginMember).then(function(data){
//    
//}).catch(function(err){
//    console.log(`Error: ${err}`);
//});
//
////
//rp(goodtest).then(function(data){
//    console.log('Applicant Activity Test 1: Good #1');
//    console.log(`Message: ${data}`);
//    return rp(goodtest2);
//}).catch(function(err){
//    console.log(`Error: ${err}`);
//}).then(function(data){
//    console.log('Applicant Activity Test 2: Good #2');
//    console.log(`Message: ${data}`);
//    return rp()
//})

//rp(goodtest2).then(function(data){
//        console.log('Applicant Activity Test 2: Good #2');
//    console.log(`Message: ${data.StatusCodeError}`);
//    
//    console.log('Applicant Activity Test 3: Bad #1');
//}).catch(function(err){
//    console.log(`Error: ${err.StatusCodeError}`);
//});
//
//rp(badtest2).then(function(data){
//    
//}).catch(function(err){
//    console.log(`Error: ${err.StatusCodeError}`);
//            console.log('Applicant Activity Test 4: Bad #2');
//});

async function someTest() {
    let res;
    console.log('Applicant Test 1: Good #1');
    try {
        res = await rp(goodApply1);
        console.log(`Application result: ${JSON.stringify(res)}`);
    } catch (error) {
        console.log(`Application error: ${error}\n`);
    }
//        console.log('Applicant Test 2: Good #2');
//    try {
//    res = await rp(goodApply2);
//    console.log(`Application result: ${JSON.stringify(res)}`);
//    } catch (error) {
//    console.log(`Application error: ${error}\n`);
//    }
//    console.log('Applicant Test 3: Bad #1');
//    try {
//    res = await rp(badApply1);
//    console.log(`Application result: ${JSON.stringify(res)}`);
//    } catch (error) {
//        console.log(`Application error: ${error}\n`);
//    }
    console.log('Applicant Test 3: Bad #2');
    try {
        res = await rp(badApply2);
        console.log(`Application result: ${JSON.stringify(res)}`);
    } catch (error) {
        console.log(`Application error: ${error}\n`);
    }
}

//async function someTest(){
//    let res;
//    console.log('Go GO');
//    try{
//        res = await rp(loginMember);
//        console.log('Applicant Activity Test 1: Good #1');
//        res = await rp(goodtest);
//        console.log(`Message: ${res}`);
//        console.log('Applicant Activity Test 2: Good #2');
//        res = await rp(goodtest2);
//        console.log(`Message: ${res}`);
//        console.log('Applicant Activity Test 3: Bad #1');
//        res = await rp(badtest);
//    } catch (error){
//        console.log(`${error}`);
//        console.log('Applicant Activity Test 4: Bad #2');
//        
//    }
//    try{
//        res = await rp(badtest2);
//    }catch(error){
//        console.log(`${error}`);
//        console.log('Applicant Activity Test 4: Bad #2');
//    }
//}

someTest();