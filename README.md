# Static Content Challenge

The challenge here is to create a node.js application that displays HTML pages at URLs that match the names of the folders in the `content` folder. The content of these pages should come from a combination of the template HTML file and a markdown file containing the content.

## #Technologies used:
-

## #Features and tests 
The application have the following three features: 

* a request to `/about-page` would return a HTML page created from the template file and the `about-page/index.md` content file.
* a request to `/valve` would return a HTML page created from the template file and the `about-page/index.md` content file.
* a request to `/jobs` would return a HTML page created from the template file and the `about-page/index.md` content file.

The application also have the following three tests:

* one that verifies that requests to valid URLs return a 200 HTTP status code
* one that verifies that requests to valid URLS return a body that contains the HTML generated from the relevant `index.md` markdown file
* one that verifies that requests to URLs that do not match content folders return a 404 HTTP status code 


## #Screenshot (Trello) 


## #Approach 

1) First I used Trello to plan out step by step what I need to do in order to build the web application with the features/tests. 

2) I copy a package.Json and gulpfile I used from a previous GA project I did but only include the dependencies I need for this project. 

3) I created a new file index.js and added the following set up: 

``` 
var express = require('express');
 
var app = express();
 
 app.listen(3000, () => console.log('Express is up and   running')); 

```
4)  and then I tested Express is up and running with nodemon in terminal. 

5)I installed ejs and set the view directory to /views and use the Express templating language. 

6)I changed the template.html to template.ejs and put inside a new folder called views and also use ejs tags for content inside the template file. 

7)https://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_encoding 
I required the file system and wrote this code below to pass the markdown file as data in the content and render this in the file template. 

```
app.get('/valves', function(req, res) {
  fs.readFile(__dirname + '/content/valves/index.md', 'utf-8', function(err, data) {
    if (err) throw err;
    res.render('template', { content: data });
  });
});
```
8)I used Mocha as my testing framework and for assertions I used Chai. To be able to make HTTP requests inside tests, I used a framework called supertests. I have also installed istanbul.

9)I created a file called mocha.opts as a setup file for mocha. 

10)Also I created a spec_helper.js file to help keep my code DRY. 

11)Next I run the test to see if it is working. 

12)I used request to make http calls in my testing 
-https://github.com/request/request 
and use assert/expect - http://chaijs.com/api/assert/

13)I required the expect,  asset and request in my test.js

14)I wrote the first code to test if a valid URL will return a 200 HTTP status code. 

15)I wrote the second test to see if invalid URL should return a 400 HTTP status code. 

16)The last test I found it quite hard to write but I managed to pass the test  after some trial and error.  

