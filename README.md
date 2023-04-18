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

# Deliverables

All deliverables can be found in the [__deliverables](__deliverables) folder. Inside there, each Sprint is broken into its own subfolder. 


* [Sprint 1](__deliverables/Sprint1) 
* [Sprint 2](__deliverables/Sprint2) 
* [Sprint 3](__deliverables/Sprint3) 


---
# Demo

A simple demo of our progress thus far can be found at http://35.202.95.163. Please note the use of HTTP instead of HTTPS, so be mindful of any credentials you provide.

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

We are going to generate an API using [Laravel 8](https://laravel.com/). This API is what will be the system that performs database operations and provides all functionality for the frontend.

### GUI

The graphical interface for this project is built using [React Native](https://reactnative.dev/). This allows us to write one interface that can port to web, iOS, and Android devices easily. 
