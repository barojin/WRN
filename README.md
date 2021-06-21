# WRN

## Summary
There are three roles such that admin, user, guest.  
A admin can CRUD the any post in the website.   
A user can CRUD posts which (user_id in session == user_id in posts DB.). 
A guest can read posts only.   

The views are divided by the user's role registered in the sign in process.   
Thus, a admin have eidt buttons for any posts, a user can see edit buttons on the post only the user have made, a guest can't see any edit button in the website. The different veiws are controlled by React rendering according to the session info which is determined by log in.

## Specification
### Dependencies
- Backend: request, express-session, bycruptjs, nedb. <br>
- Frontend: parcel-bundler, http-proxy-middleware, express.

### JS libs:
- React.js, Node.js.

### OS: 
- macOS Big Sur 11.4.

## INSTALLATION
clubServer <br>
    backend<br>
npm install request --save   
npm install express-session --save  
npm install bcryptjs --save  
npm install nedb --save  

ReactClubUI<br>
    frontend<br> 
npm install parcel-bundler --save  
npm install http-proxy-middleware --save  
npm install express --save  

## How to run
node clubServer.js  
node devProxy.js   
http://127.0.0.1:1234/

Do the 'node clubServer.js' in backend, <br>
Do the 'node devProxy.js' in frontend. <br>
The website will show up with the address http://127.0.0.1:1234/ on your web browser.
