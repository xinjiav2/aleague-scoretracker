---
toc: true
layout: post
title: Deployment Blog
description: This is our groups deployment blog.
---


<h2>Quick Notes on Deployment From Mr. Mort</h2>


<p>In order to login to the deployment server on AWS EC2 you will use the cockpit backdoor.
https://cockpit.stu.nighthawkcodingsociety.com/

The username for the account is "ubuntu".

You will need to DM Mr. Mort if you shared Deployment blog and will be Deployment admin, with the password that has a hint of "3 Musketeers".
</p>

<h2>First time Install</h2>

<h3>1. In your project directory, create a .env file with passwords of the users</h3>

<h3>2. Run ./scripts/db_init.py</h3>

- This will initialize the database and reset all the data tables.

<h3>3. In your repo run Docker commands</h3>

- Run: ```docker-compose build```
- Run: ```docker-compose up -d```

<h3>Test your server</h3>

- Curl provides text response of your requested page

- Look for your application and port: ```docker ps```
- Verify your application is working: ```curl localhost:8101```

<h3>Note</h3>

- Do not put user passwords in your blogs or in your code since it's a security risk
- Do not commit them to GitHub
- Use the ```.env``` files to store passwords. Add ```.env``` to your ```.gitignore``` file.


