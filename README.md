MME Automation Scripts
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
git clone https://devgitlab.dev.owfms.net/MME/node-scripts.git
cd node-scripts
```

### Install npm
Follow OS specific instructions from https://www.npmjs.com/get-npm

Verify it is installed with
```
npm -v
```  


For consistency purposes all packages to be installed from 
https://nexus.dev.owfms.net/repository/npm-all/

Note. New package additions are handled by Solers team.

default registry is 
https://registry.npmjs.org/

check where registry points to
```
$ npm config get registry
https://nexus.dev.owfms.net/repository/npm-all/
```

It is a system wide change and is done once, change only if needed

```
npm config set strict-ssl false
npm config get registry
npm config set registry https://nexus.dev.owfms.net/repository/npm-all/
```

Packages to be installed are in package.json file.

At the moment chromedriver needs special attention it could not be installed directly from nexus.
 
You may get it from  https://chromedriver.chromium.org and get the latest stable release.

```
cp ~/Downloads/chromedriver_mac64.zip .

npm install chromedriver@78.0.1 --chromedriver_filepath=/full/path/to/chromedriver_mac64.zip

```


### Install packages
(from package.json) by running following command
```
cd ~/WORKING.DIR/node-scripts
npm install
```
### Verify installation
```
git checkout dev1
./Run.me.sh tests/FMS/SpecsCIF/test1-createAccount-spec.js

```

### Environment Configuration
Environment related info is contained in config directory
For example for sandbox it is 
```
config/sandbox.json
```
Run.me.sh contains environment variable in case of sandbox it should be set
```
export NODE_ENV=sandbox
``` 

### Running Instructions
To run one test

./Run.me.sh tests/PROJECT_NAME/SpecsXXX/Test_name

for example
```
cd ~/WORKING.DIR/node-scripts 
./Run.me.sh tests/FMS/SpecsCIF/test1-createAccount-spec.js
```

To run ALL tests for a given project
./Run.me.sh tests/PROJECT_NAME/SpecsXXX
For example
```
cd ~/WORKING.DIR/node-scripts
./Run.me.sh tests/FMS/SpecsCIF/
```

To run all tests for ALL projects
```
./Run.me.sh tests/
```

### IntelliJ setup

Make sure to select ECMA6 in 
IntelliJ IDEA->Preferences->JavaScript: Javasript language version

