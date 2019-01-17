![cf](http://i.imgur.com/7v5ASc8.png) Assignment Submission Instruction
=======================================================================# s

## Daily Warmups
* Create a new repository for each warmup
  * `warmup-daily`, `warmup-01`, `warmup-02`, `warmup-03`, `warmup-04`
  * On each day, create a new branch of this repo with the date
    * i.e. `11-22-2018`
  * Submit a PR from that branch to your master for review
  * Time-Box your warm-up development to :30 each day

## Data Structures / Code Challenges
**Create a new repository called `data-structures-and-algorithms`**

* At the root of this folder, you'll need a standard testable node setup (config files available in the class repo)
  * package.json
    * jest and eslint as dependencies
  * .travis.yml
  * .eslintrc.json
  * .gitignore

**For each new data structure, create a folder for it**

* In this folder you will create your constructor/library module
  * i.e. `data-structures-and-algorithms/linked-lists`
  * Your importable module should be named `index.js`
  * Include JSDoc comments above every function in your implementation
  * Run `jsdoc **/*.js -d ./docs` in the root folder to generate your master documentation
  * Place your tests in a __tests__ folder within the module directory
  
### Daily Code Challenges

* Work in a folder called called `challenges` in your `data-structures-and-algorithms` repository
* For each challenge, create a sub-folder for that challenge along with a __tests__ folder
* Your files for the challenge should be named appropriately
* These challenges will generally require you to use a data structure module to solve the challenge. This structure should allow you to easily import those in, like so:
  * i.e. `let sll = require('../linked-lists');`
* **Time-Box your code challenge to 1 hour each day**
  * :40 at the whiteboard with your partner
  * :20 composing your code and tests
  

**To Submit Your DSA Lab or Challenge**

* Work in a new branch of the DSA repository
* Follow the assignment instructions
* Create a PR with your work
* Ensure that your PR is picked up by `travis-ci.com` and that your tests are visibly running and passing.
* Submit to canvas:
  * A photograph of your whiteboard
  * A link to the PR for the branch your code was written to
  * A link to your passing tests from that PR on `travis-ci.com`

Your folder structure should look like this:
```
  data-structures-and-algorithms
    ├── challenges
    │   └── challenge_01
    │       ├── __tests__
    │       │   └── something.test.js
    │       └── something.js
    └── linked-lists
        ├── __tests__
        │   └── linked-lists.test.js
        └── index.js
```

## Labs

### Operation
* In the folder for each class in the class repository, you will find a `lab` folder
* The folder for each day in the repo contains:
  * LAB.md - The instructions for the lab
  * README.md - A template which you will fill out each day to submit your lab 
  * `starter-code` folders - Contains any starter code for your lab
* Create a new repository for each lab
  * If there is a `starter-code` folder for the lab, copy it's contents (not the folder itself) into your new repository
* Ensure that your repository/branch is connected to travis-ci.com
* For deployable labs...
  * Ensure that your repository/branch is connected to a dyno at heroku.com
    * Create a new one for each day that contains a server deployment
    
### Configuration
 Configure the root of your code folder with the following files and directories. Thoughtfully name and organize any additional configuration or module files.
 * **README.md** - contains documentation
 * **.env** - contains env variables (should be git ignored)
 * **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file 
 * **.eslintrc** - contains the course linter configuratoin
 * **.eslintignore** - contains the course linter ignore configuration
 * **.travis.yml** - contains the course linter ignore configuration
 * **package.json** - contains npm package config
   * create a `lint` script for running eslint (eslint **/*.js)
   * create a `test` script for running tests
   * create a `start` script for running your server
 * **index.js** - the entry point for your application
 * **src/** - contains your core application files and folders
 * **src/app.js** - (or main.js) contains your core application bootstrap
 * **src/lib/** - contains module definitions
 * **\_\_test\_\_/** - contains unit tests
 
### Deployment - Server Based Labs
 * Your server must be deployed at Heroku
 * If it requires a database, provision it
 * For APIs, your endpoints should all be testable remotely using httpie or postman
 * For Web Servers, your website must be reachable
 
### Deployment - React Labs
 * Your app must be deployed at AWS Cloudfront
 * Use an automated deployment, connecting your repository to AWS through cloud formation
 
### Testing
 * Write a complete set of tests for all data models, independent of the server
 * For testing the server and routes, use `supertest` to do end-to-end testing
   * What we're testing is not whether express works, but whether your routes are doing the correct things.
 * Your tests must be running green on travis.com
 
###  Documentation
 * Create a `docs` folder 
 * Write JSDoc for every function
 * Run `jsdoc` and target the doc folder as the target for the build.
 * For API Servers, put an updated swagger.json file in that folder
   * Ensure that your API server has a /doc route to serve the swagger doc
 * Complete the README.md file included in the lab folder
 * Be sure to include the URLs to your server, api docs, and jsdocs at Heroku
 * Be sure to include a UML / Flow Drawing of your application
 
### Canvas Submission
  * Link to your README.md
