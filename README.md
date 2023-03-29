# development-project
Development project for KSU SWE 6733 Spring 2023 Team 3.    

The goal of this project is to build an outdoor app for adventure seekers and provide all online users seamless access to an experience-driven platform that allows them to connect to a community of outdoor enthusiasts and find a match on criteria simply beyond location.

The team makes use of a private Microsoft Teams channel for all collaboration.

---
# Team Members  

Elliott Allmann (Scrum Master)  
Wondemu Damite   
Melkyas Eshetu  
Rush Neighbors (Product Owner)  
Collin Williams 

---

# Part 2 (Sprint 1) Deliverables

The product backlog, along with all associated stories can be found in the [associated Github Project]()

## Story point forecast

The team estimates we can complete 20 points in this sprint. Since this work is mostly set-up and some initial design and decision making, we will most likely not have all team members as active as possible quite yet.

## Sprint Burndown Chart

The Sprint Burndown Chart was created using Zenhub, as Github Projects does not have a built-in burndown chart functionality.

The [burndown](burndown.png) screenshot is a screenshot of our burndown chart from Sprint 1, during which we were able to close out all but one of our planned stories.

## Scrum

Scrums were conducted asynchronously via messaging in our Microsoft Teams channel. We performed one SCRUM via video meet, but it seems the recording expired.

The [scrum](scrum.png) screenshot is an example of one of our daily scrums.

## Pair programming

Pair programming was done for the Behavior Driven Testing. [The link]() to the video can be viewed as long as you are logged in with your Kennesaw account.

## Test-first

Unit tests can be found in the [API tests directory](api/tests/Feature/RegistrationTest.php). To run the unit tests, follow the instructions in the [API README](api/README.md) to create a new API instance. By default, database connection is not allowed, so contact the team to gain access. Alternatively, you can set up a Neo4j database locally and connect the API to it.
A screenshot of these running successfully can be seen at [unit-tests.png](unit-tests.png).


Behavior driven tests can be found in the [testing](testing) directory.

## Sprint Review

The Sprint Review session can be found using [this link](https://kennesawedu.sharepoint.com/:v:/s/Team-Spring2023Group3SWE6733-EmergingSoftwareEngineeringProc/EVoyzLgxO6NGpeCr-5BMQe8BMUyJSrqr6LPtth2HScvq1g?e=4COKr6). You must be signed in with your Kennesaw account to view the video.

## Project Demo

A simple demo of our progress thus far can be found at http://35.202.95.163 . Please note the use of HTTP instead of HTTPS, so be mindful of any credentials you provide.


---
# Project Documents

## Product Vision

Please reference the [Product Vision](Product%20Vision.md) for more information.

## Product Backlog

We are using Github Projects for our product management tool. We believe it offers sufficient functionality yet removes unnecessary integration overhead over other options such as Jira or Azure DevOps. 
Please reference the [Product Backlog](https://github.com/orgs/KSU-SWE6733-Spring2023-Team3/projects/1) for more information.

## Definition of Ready

Please reference the [Definition of Ready](Definition%20Of%20Ready.md) for more information.

## Backlog Prioritization

We prioritized our backlog following the steps mentioned in [Backlog Prioritizing](Backlog%20Prioritizing). 

# Technical Items

## Tech Stack

### Database

This project uses the [Neo4J](https://neo4j.com/) graph database for storage. Using a graph databases enables us to quickly and easily find connections between data.

### API

We are going to generate an API using [Laravel 10](https://laravel.com/). This API is what will be the system that performs database operations and provides all functionality for the frontend.

### GUI

The graphical interface for this project is built using [React Native](https://reactnative.dev/). This allows us to write one interface that can port to web, iOS, and Android devices easily. 
