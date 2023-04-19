from py2neo import Graph, Node
from faker import Faker
import random

fake = Faker()

data = []

graph = Graph("35.209.232.155", auth=("neo4j", "fF9vX1Ta95uTAZoV1cbRrcWoAZ7uTVDL"))

for i in range(1000):
    user = fake.name()
    zipcode = fake.zipcode()
    gender = random.choice(["male", "female", "other"])
    weights = [0.4, 0.4, 0.2]
    preference = random.choice[("male"), ("female"), ("other"), ("male", "female"), ("male", "other"), ("female", "other"), ("male", "female", "other")]
    weights = [0.3, 0.3, 0.1, 0.2, 0.04, 0.04, 0.02]
    age_ranges = list(range(18, 40)) + list(range(40, 55))
    weights = [0.8] * len(range(18, 40)) + [0.2] * len(range(40, 55))
    age = random.choices(age_ranges, weights)[0]
    interests = random.choice(["Hiking", "Biking", "Swimming", "Fishing", "Rock Climbing", "Trailblazing", "Running/Jogging", "Horse Back Riding", "Rafting", "Camping", "Ziplining", "Skiing/Snowboarding", "Bungee Jumping", "Canoeing", "Skydiving"])
    expertise_in_interest = (["novice", "beginner", "intermediate", "expert", "professional"])
    activity_of_interest = (["less than once a month", "monthly", "twice monthly", "weekly", "more than once a week"])

    userNode = Node(user)
    graph.create(userNode)

    zipcodeNode = Node(zipcode)
    graph.create(zipcodeNode)

    genderNode = Node(gender)
    graph.create(genderNode)

    preferenceNode = Node(preference)
    graph.create(preferenceNode)

    ageNode = Node(age)
    graph.create(ageNode)

    interestsNode = Node(interests)
    graph.create(interestsNode)

    expertise_in_interestNode = Node(preference)
    graph.create(expertise_in_interestNode)

    activity_of_interestNode = Node(age)
    graph.create(activity_of_interestNode)

    graph.create(Relationship(userNode, "LIVES_IN", zipcodeNode))
    graph.create(Relationship(userNode, "IS_GENDER", genderNode))
    graph.create(Relationship(userNode, "HAS_PREFERENCE", preferenceNode))
    graph.create(Relationship(userNode, "HAS_AGE", ageNode))
    graph.create(Relationship(userNode, "INTERESTED_IN", interestsNode))
    graph.create(Relationship(userNode, "HAS_EXPERIENCE", expertise_in_interestNode))
    graph.create(Relationship(userNode, "IS_ACTIVE", activity_of_interestNode))