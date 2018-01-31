# Static Content Challenge

The challenge here is to create a node.js application that displays HTML pages at URLs that match the names of the folders in the `content` folder. The content of these pages should come from a combination of the template HTML file and a markdown file containing the content.

## #Technologies used:
* Node.js
* Express.js
* EJS
* Gulp
* Nodemon
* Chai
* Trello (agile methodology)
* Mocha
* Istanbul
* Supertest
* Babel
* Showdown (https://github.com/showdownjs/showdown) 

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

![](https://i.imgur.com/vmkeUxZ.png)

## #Approach 

1) First I used Trello to plan out step by step what I need to do in order to build the web application with the features/tests. 

2) I copy a package.Json and gulpfile I used from a previous GA project I did but only included the dependencies I need for this project. 

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
  fs.readFile(__dirname + '/content/valves/index.md', function(err, data) {
    if (err) throw err;
    res.render('template', { content: data });
  });
});
```

8)I also used a package called 
Showdown which is a Javascript Markdown to HTML converter -
https://github.com/showdownjs/showdown I installed the packaged, required it and used it in my code as per below. 

```
app.get('/valves', function(req, res) {
  fs.readFile(__dirname + '/content/valves/index.md', function(err, data) {
    const filename = converter.makeHtml(data);
    if (err) throw err;
    res.render('template', { content: filename });
  });
});

```

9)My problem was that I was returning HTML content with the HTML tags. I found a code that will strip the HTML tags in JavaScript - https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/ 

```
.replace(/(<([^>]+)>)/ig,'');

```

10)I used Mocha as my testing framework and for assertions I used Chai. To be able to make HTTP requests inside tests, I used a framework called supertests. I have also installed istanbul.

11)I created a file called mocha.opts as a setup file for mocha. 

12)Also I created spec_helper.js file to help keep my code DRY. 

13)Next I run the test to see if it is working. 

14)I used request to make http calls in my testing 
-https://github.com/request/request 
and use assert/expect - http://chaijs.com/api/assert/

15)I required the expect,  asset and request in my test.js

16)I wrote the first code to test if a valid URL will return a 200 HTTP status code. 

17)I wrote the second test to see if an invalid URL should return a 400 HTTP status code. 

18)The last test I found it quite hard to code but I managed to pass the test  after some thinking outside of the box. 

19)I tested each one separately while coding but if you do yarn test in the terminal all three tests will passed.
 

