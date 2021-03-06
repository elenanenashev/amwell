AMWELL Automation Scripts
---

### Getting Started
This test suite uses Selenium WebDriver and node js engine

Go to the new work directory, ie. WORKING.DIR

```
cd ~
mkdir WORKING.DIR
cd ~/WORKING.DIR/

```

clone project into working directory

```
git clone https://github.com/elenanenashev/amwell.git
cd amwell
```

### Install npm
Follow OS specific instructions from https://www.npmjs.com/get-npm

Verify it is installed with
```
$ npm -v
6.14.4
```  

### Install nodejs from

```
https://nodejs.org/en/download/
```
Verify installation with

```
$ node -v
v12.16.3
```


### Install packages
(from package.json) by running following command
```
cd ~/WORKING.DIR/amwell
npm install
```

### Verify chromedriver is installed 

```
$ npm list chromedriver
am@0.0.0 /Users/elenanenashev/GitHUB/amwell
└── chromedriver@81.0.0
```


### Running Instructions
To run test(s)

./Run.me.sh tests/PROJECT_NAME/Specs/Test_name

for example to run one test only
```
cd ~/WORKING.DIR/amwell 
./Run.me.sh tests/AMWELL/Specs/test1-createAccount-spec.js
```

To run ALL tests for a given project
./Run.me.sh tests/AMWELL/

For example
```
cd ~/WORKING.DIR/node-scripts
./Run.me.sh tests/AMWELL/
```

To run all tests for ALL projects
```
./Run.me.sh tests/

```

or

```
./Run.me.sh
```

### Note for IntelliJ setup

Make sure to select ECMA6 in 
IntelliJ IDEA->Preferences->Languages & Frameworks->JavaScript: Javasript language version

