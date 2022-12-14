# Candidate Takehome Exercise
This is a simple backend engineer take-home test to help assess candidate skills and practices.  We appreciate your interest in Voodoo and have created this exercise as a tool to learn more about how you practice your craft in a realistic environment.  This is a test of your coding ability, but more importantly it is also a test of your overall practices.

If you are a seasoned Node.js developer, the coding portion of this exercise should take no more than 1-2 hours to complete.  Depending on your level of familiarity with Node.js, Express, and Sequelize, it may not be possible to finish in 2 hours, but you should not spend more than 2 hours.  

We value your time, and you should too.  If you reach the 2 hour mark, save your progress and we can discuss what you were able to accomplish. 

The theory portions of this test are more open-ended.  It is up to you how much time you spend addressing these questions.  We recommend spending less than 1 hour.  


For the record, we are not testing to see how much free time you have, so there will be no extra credit for monumental time investments.  We are looking for concise, clear answers that demonstrate domain expertise.

# Project Overview
This project is a simple game database and consists of 2 components.  

The first component is a VueJS UI that communicates with an API and renders data in a simple browser-based UI.

The second component is an Express-based API server that queries and delivers data from an SQLite data source, using the Sequelize ORM.

This code is not necessarily representative of what you would find in a Voodoo production-ready codebase.  However, this type of stack is in regular use at Voodoo.

# Project Setup
You will need to have Node.js, NPM, and git installed locally.  You should not need anything else.

To get started, initialize a local git repo by going into the root of this project and running `git init`.  Then run `git add .` to add all of the relevant files.  Then `git commit` to complete the repo setup.  You will send us this repo as your final product.
  
Next, in a terminal, run `npm install` from the project root to initialize your dependencies.

Finally, to start the application, navigate to the project root in a terminal window and execute `npm start`

You should now be able to navigate to http://localhost:3000 and view the UI.

You should also be able to communicate with the API at http://localhost:3000/api/games

If you get an error like this when trying to build the project: `ERROR: Please install sqlite3 package manually` you should run `npm rebuild` from the project root.

# Practical Assignments
Pretend for a moment that you have been hired to work at Voodoo.  You have grabbed your first tickets to work on an internal game database application. 

#### FEATURE A: Add Search to Game Database
The main users of the Game Database have requested that we add a search feature that will allow them to search by name and/or by platform.  The front end team has already created UI for these features and all that remains is for the API to implement the expected interface.  The new UI can be seen at `/search.html`

The new UI sends 2 parameters via POST to a non-existent path on the API, `/api/games/search`

The parameters that are sent are `name` and `platform` and the expected behavior is to return results that match the platform and match or partially match the name string.  If no search has been specified, then the results should include everything (just like it does now).

Once the new API method is in place, we can move `search.html` to `index.html` and remove `search.html` from the repo.

#### FEATURE B: Populate your database with the top 100 apps
Add a populate button that calls a new route `/api/games/populate`. This route should populate your database with the top 100 games in the App Store and Google Play Store.
To do this, our data team have put in place 2 files at your disposal in an S3 bucket in JSON format:

- https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/android.top100.json
- https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/ios.top100.json

# Theory Assignments
You should complete these only after you have completed the practical assignments.

The business goal of the game database is to provide an internal service to get data for all apps from all app stores.  
Many other applications at Voodoo will use consume this API.

#### Question 1:
We are planning to put this project in production. According to you, what are the missing pieces to make this project production ready? 
Please elaborate an action plan.

#### Question 2:
Let's pretend our data team is now delivering new files every day into the S3 bucket, and our service needs to ingest those files
every day through the populate API. Could you describe a suitable solution to automate this? Feel free to propose architectural changes.

#### Question 3:
Both the current database schema and the files dropped in the S3 bucket are not optimal.
Can you find ways to improve them?


# Theory Answers
#### Question 1: 
The project is missing tests on the backend. Didn't have time to implement tests.
The populate functionnality should check for existing data in database, and update accordingly. 
We should maybe update the current model to have unique key (for example the appID). I tried to do that with sequelize/sqlite combo, but the 
updateOnDuplicate option together with setting up a unique key didn't seem to work. Not too familiar with sqlite/sequelize. But I think an improvement should be made there.
Also the populate should maybe require an authentication.

Another improvement would be also to tidy up the project. I started separating some backend files, but it can be improved by setting up folder/routes (e.g games folder routes).
Frontend is even worse but is not our subject.

The project is missing Typescript, which would help tremendously when coding and avoid mistakes.
The project is not using ES6 :(.

#### Question 2:
One solution would be to implement a scheduler with node. In my previous job we used Agenda.
We could schedule the populate script to be ran on a regular basis, say every night at 2am. 

We could also have the data team to provide the new data on our webapp instead of pushing to S3. We could then be responsible to deliver that data to S3 (for saving purposes). 

Finally, I never implemented that, but I'm pretty sure there could be a solution using AWS Lambda functions to automate this when a new file arrives into S3.

#### Question 3:
I started hinting on this in question 1, but we should have the appId be a unique key (or maybe the primary key, since it is actually unique). Therefore, if a record already exists in the database we could update it.

Also, the position of the app in the top100 is not really saved, we could add a field in Game table.

Also, the json file formatting is obnoxious (an array of size N of arrays of size M). Could be a regular array, easier to loop, or even better, a hashmap (with key being the appid).

Finally, everything is public (of course it is a sample project) but i don't like using the S3 public url in our webapp. First, the url should be private. Second, it should be provided by the backend rather than the front (when possible).