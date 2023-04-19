# Sprint 2 Deliverables


## Story point forecast

Following the [Yesterday's Weather](https://www.scruminc.com/yesterdays-weather/) concept, the team estimates we can complete **22** points in this sprint. 

This point value is based on our progress during [Sprint 1](../Sprint1), but takes into account the increased workload of team members other classes.

Last sprint, we completed 28 points. 

Due to increased workload in other classes and personal availability due to real-world circumstances, we estimated we would be able to complete 80% of the work we did last sprint.

28 points * .80  = 22.4, rounded down to **22** points. 

We expect this number will become more accurate over time, as we have more Sprints to narrow down our velocity.

## Continuous Integration

The new requirement for Sprint 2 was to implement Continuous Integration. Appropriate configuration files can be found in the [.github](../../.github) directory. The review of CI tools we did can be found in [ci_tool_review.md](ci_tool_review.md).

## Sprint Burndown Chart

## Scrum

Scrums were conducted during this sprint. A [recording of one of these SCRUMs](https://kennesawedu.sharepoint.com/:v:/r/sites/Team-Spring2023Group3SWE6733-EmergingSoftwareEngineeringProc/Shared%20Documents/General/Recordings/Meeting%20in%20_General_-20230411_200645-Meeting%20Recording.mp4?csf=1&web=1)
can be viewed as long as you are logged in with your KSU account.


## Pair programming

Pair programming was done throughout various sessions. One example of such can be seen designing the matching algorithm. 

[The Pair Programming Session](https://kennesawedu-my.sharepoint.com/:v:/g/personal/cneighb3_students_kennesaw_edu/ERQfaCaUEahJhKWvjdxrrmIBM5_mRclltf--W1vw7IXOcg?email=eallmann%40students.kennesaw.edu) was shared by direct access. If you have trouble viewing, please let us know and we will send a link directly.

## Test-first

Unit tests can be found in the [API tests directory](api/tests/Feature/). To run the unit tests, follow the instructions in the [API README](api/README.md) to create a new API instance. By default, database connection is not allowed, so contact the team to gain access. Alternatively, you can set up a Neo4j database locally and connect the API to it.
An example of this running in Sprint 2 can be found in [unit_tests_sprint_2.png](unit_tests_sprint_2.png).


Behavior driven tests can be found in the [tests](../../tests) directory. There are several new and improved tests since the last sprint.

## Sprint Review

On 2023-04-18, our team conducted a Sprint Review session. Unfortunately, there was a mixup with the recording and we were not able to capture the Review session.

The [screenshot](2023-04-18_Sprint_Review_Stories.png) of the stories reviewed has been uploaded to the repository.

Immediately after realizing, we took a screenshot of the meeting attendees and date-time. The fact that the review was conducted is evident in our [Sprint Burndown Chart](#sprint-burndown-chart). 


## Project Demo

A simple demo of our progress thus far can be found at http://35.202.95.163 . Please note the use of HTTP instead of HTTPS, so be mindful of any credentials you provide.
