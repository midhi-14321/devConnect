nodejs is a javascript runtime environment , built on a chrome v8 js engine

it is a cross platform - means that can run on ant platform like windows, unix, Linux , macOS and it was open-source

nodejs is a c++ application with V8 embedded into it.

it is invented in 2009 by Ryan dawl

spider monkey(firefox) - at starting ryan dawl devoloped on this just 2 days after shifted to V8 engine

V8 engine(google chrome)

chakra(safari)

2009(MacOs & Linux) ----> 2010(npm) --->2011(Joyent+MS)(windows supports)

2012(Isaac (npm) -developer took take of node) ---> 2014(divided like io.js & node.js) -->2015(combined both js) -->2019(open js foundation) maintains it

V8 engine is a google's open source high performance javascript and webassembly , written in C++ . it is used in chrome and node js

job of v8 engine is executes js code

JS code read by V8 engine and translate to machine understand lang code

JS follows ECMA script standard/rules

    				High level lang code (js, c++, python…)	 here js engine(V8) converts high level to low level lang(machine code)
    				    |
    				Machine code
    				    |
    				Assembly code
    				    ^

computer understand --> binary code on top -|

node REPL(read evaluate print loop)

window,this,self,frames,globalThis(refers to the same object) as global window object

modules protects their variables and functions from leaking

export syntax:-- module.exports=function_name;

import syntax:- const function_name=require('file_path')

In strict mode we cannot access variables without constants

module.exports={} it is empty object where inside key,value is there

All the code of the module is wrapped inside a function(IIFE)

IIFE(immediately invoked function expression)

syntax and ex:-

(function (){

    //all the code of module run inside here

})();

require('/path') -- behind the scenes doing when require used

1. resolving the module --> .json,./localpath,node.module

2. loading the file --> file content is loaded according to the file type

3. wraps inside IIFE

4. evaluation

5. Caching

there are two ways to import/export modules

1. common js modules -- synchronous , non-strict mode , older way

require('/path')

2. ES6 modules -- asynchronous, import&export, newer way, strict mode

JS--- synchronous , single threaded but supports asynchronous features

synchronous function will block main thread

V8 engine talks to libuv --libuv talks to os(file,www,setTimeout,more) and get response back to libuv and get to V8 engine

libuv developed by c lang

In simple libuv is a mediater between V8 engine and OS(operating system)

In nodeJS inside -> V8 engine and Libuv is there

In V8 engine inside

1. call stack - inside GEC(global execution contest)

2. Memory heap --inside all varaibles/functions are storing

3. Garbage collector

for synchronous code directly run with the V8 engine

for asynchronous code run with V8 but needs help with libuv support

ex:--

console.log("hello node")

setTimeout(()=>{
console.log('print after 3 seconds')
},0)

function multiplyNumbers(a,b){
const sum=a\*b
console.log(sum)
}

multiplyNumbers(10,5)

console.log('thanks you node')

In this code even setTimeout is 0 seconds still it runs last because it is a async function so after clearing all the code in main stack sync code then the async code is entering to main stack through event loop

when async function is there in the code means then node gives a task to Timer Api(web api) to count the time in mean while all sync code is executing then the time api is saying like I'm done with my task then the code is pushed to callstack queue then the event loop check the main call stack is empty or not ? if empty then moves callstack to the mainStack.

what is happening behind the code how it is executing and getting value ?

==> whenever we given piece of code to js V8 engine then it is doing

1. parsing (first stage) -- In this step 1) Lexical analysis (Tokenization)

code is converted in to tokens

step 2) syntax analysis(parsing) --> all tokens are formed a AST(abstruct syntax tree)

2. Interpreter

AST is passed code to interpreter then interpreter converts code to bytecode then execution but in this whole code some portion of code is repeating every time so that code is given to Turbofan compiler so it is optimised to machine code and execution

Turbofan compiler will do optimization and deoptimization

JS uses the JIT(just in Time) compiler means it uses both interpreter and compiled lang

Step 1
JS code runs line by line (quickly starts executing)
Interpreter

Step 2
Engine notices some code runs again & again
Profiler (inside engine)

Step 3
That part gets converted into machine code for speed
JIT Compiler

Step 4
If code changes, it can go back to interpreted mode
De-optimizer

Inside eventloop there are 4 phases (i.e)

1. Timer -->will handle timer functions (setTimeout,setInterval)

2. Poll --> will handle (api fetches, reading files , browsing from google ) like

3. check --> will handle(setImmediate function)

4. close --> it will close after all this done

Inside all these four phases another 2 phases are there (i.e)

1)process.nextTich()

2)promise callbacks

so going to event loop first checks these two phases(process.nextTich)(promise callbacks) and then going to each phase in main event loop and after each phase complete in main event loop and going to inner two phases

In nodeJS size of the UV thread pool by default is 4

so when we call the file so libUV sends to thread pool then it request the file in os so it takes the response to thread pool then it send to libUV and then it sends to V8 engine

so in the process threadpool it has only 4 threads you requested 5 files so 5th file have to wait for 1 thread empty then it goes to empty threadpool

Season 2

SDLC(software development life cycle method) needed for before starting real time projects in company

Requirement -> Design -> Development -> Testing -> Deployment ->

Maintenance

Architecture| >
monolith(doing big tasks) vs microservices(doing small tasks)

backend notification

frontend analytics

database auth

authentication dashboard

email FE

analytics BE

how user requested data comes out?

=> user is requesting a data from the server so first it makes a socket connection with server then the request is taken API then API is requested to server and getback the data and the data is given to user in the form of response in between user and server API is acts like a barrier

In big server multiples server can create but each server has unique port number so that port refers to that sever

servers can connect other servers also

sockets vs websockets

sockets are closed after server
sometime

websockets are fixed for longtime btw client and

Create a Server

1. import type of server you are creating

2. create a server

3. res to the request

4. create a port

Dev Tinder app features

1. create an account

2. login

3. update your profile

4. feed page - explore

5. send connection request

6. see our matches

7. see request we have sent/received

Tech planning

2 microservices

LLD

DB design

user

like firstname,lastname,emailid,password,age,gender

connection request

fromUserId to toUserId

status - pending , approve , rejected , blocked

Api design

http methods

get , post , put , patch , delete

version of package

express = ^4.19.2

three digits refers different purpose

1st -> major(major changes i.e big )

2nd -> minor(minor changes i.e adding some new features)

3rd -> patch(small change in express)

^ - means it allows automatic minor and patch updates of version

but it not allowed to update major update

ex:- 4.19.2 -> 4.19.2>= and <5.0.0

~ - means it allows to update patch of version not even allowed to update minor and major updates

ex:- 4.19.2 -> 4.19.2>= and <4.19.0

nodemon is a library which is updating server automatically without doing human interactions

npm install -g nodemon (it is installed global not for project level)

like normal when we update anything then we stop the server and again re run the server in node

but in nodemon it is updating itself

=>creating a server in Express JS

import express from the installed modules

call the express

use the server and send the response to user

listen for port

const express=require('express')

const app=express()

app.use((req,res)=>{

    console.log('something...')

})

app.listen(2000) -> give port number

run the server like nodemon 'path' or node 'path'

suppose over server is http://localhost/test

after the given route in code in url whatever we given it is working

if we do app.use('/user') --> use -> is for all HTTP methods like we can get data , post data , delete data, update data from the server of database

if we do app.get('/user') --> get -> is for only get the data from the server

multiple route handlers
ex:-

const express = require("express"); // import from node modules

const app = express(); // calling the express
app.use(
"/user",
(req, res, next) => {
console.log("1st response");
next();
// res.send("this is new rote");
},
(req, res) => {
console.log("2nd response");
res.send("2nd respond");
}
);

app.listen(2000, () => {
console.log("server is successfully updated on port 2000");
});

when we define next() express expects route

the functions we put in middle is knows as middlewares

data is deployed in the AWS which is managed by mongodb

data is stored in the mongodb compass

how to connect the database to the server

1)install mongoose and import to the file and connect to the database mongoDB(cluster) and export the file

2)import the express and use the express in another file

=>connect the database to the server file

onething is before connecting to the server first connect to the database

how to connect to the database

1)const mongoose=require('mongoose') //import the mongoose

2. const connectDB=async ()=>{

await mongoose.connect(URL of cluster in database ) // connect the database to moongose

}

how data is stored in the database

User hits signup API  
 ↓  
POST method triggers  
 ↓  
New User instance is created  
 ↓  
Mongoose checks schema  
 ↓  
If schema is valid → mongoose.save()  
 ↓  
Data stored in MongoDB  
 (Cluster → Database → Collection → Document)  
 ↓  
Response back to user

JSON is a data format used to store and transfer data between systems

share/store data between systems

express.json() -- will do read the JSON data and convert the data to js object and add the data to (req).body

Mongoose is a nodejs library used to interact with mongoDB in a more structured , easier and safer way.

mongoDB =raw database

mongoose=helper/manager that talks to mongoDB for you

It helps us in:

1. define schemas
2. create models
3. validate data
4. make queries easier
5. avoid mistakes(like inserting wrong data types)

how data user data is storing in the database?

user data -> frontend send the request to backend -> express server receive

the request -> mongoose creates a new instance for data -> mongoose saves

the data to mongoDB -> mongoDB stores the data

runValidators:true -> by default mongoose will not check validations even we given in the code so we should run the validations manually

runDocument:"after" -> after updating the data will display the updated changes with this field

/something/:id -> for dynamic id's

req.params?.id ---> id taking from the url

mongoose schema types

trim() - remove leading and talling space

minlength=3

maxlength=8

required -> mandatory for user to give the data with required field

unique -> we cannot change or update the data with unique field

default='something...' -> if user is not given it is taken automatically

validate(value) - custom validation to check the user value is there in our list or not like

ex:

gender:{

type:String
validate(value){

if(!['male','female','other'].includes(value)){
throw new Error('something went wrong')

}
}

}

skills:[strings] -> for more than one value

timestamps -> it tracks the post/patch/put methods means it is giving the
date and time

lowercase , uppercase -> convert to the case

converts to the case and it will be displayed to that when the user

token process

=> user logs in => server verify email and password => if both are valid =>
creates a unique JWT token => server sends the token to user inside cookies => so browser stores the token in cookies => next time user is requested any api like /profile API => server receives the token through browser => server verify the token through secret key while token is creating initial => if it is valid => user allowed to navigate to requested API => otherwise not allowed

token is divided three parts like ex:- aaa.bbb.ccc

1)header -> algorithm and type of token
2)payload -> userID(user data)
3)signature -> cryptographic function , token is created by server , not modified by anyone
it contains algo(header+payload+secretkey)

server uses the same single secret key to verify the signature

working of signature in token

    |

verify() takes the header and payload from the received token

it uses secret key to recalculate the signature

the recalculated signature matches the existing signature in the token

verification passes and the decoded payload is returned

signature contains ---> algo(header+payload+secret)

when it verify another time decoding the server sended token with exisiting signature
