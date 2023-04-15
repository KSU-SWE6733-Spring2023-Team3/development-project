# development-project gui
Development project for KSU SWE 6733 Spring 2023 Team 3.    

This folder contains the React Native GUI for our development project. It was set up using a tabbed project template.

In order to run the project you'll need Expo CLI.

On Mac to install Expo you can run the following in terminal:
npm install -g expo-cli


Once you have Expo installed you can run the project by navigating to the base folder of the gui and running one of the following commands depending on which version of the app you'd like to run:

- npm run android
- npm run ios
- npm run web

Additionally you can install the Expo GO app on your phone to test the app directly on your phone. I haven't tried this myself but it seems pretty straightforward.


In gui/app/(tabs)/index.tsx:

> +  const DEMO_CONTENT = [
+    {
+      id: 0,
+      name: "Erica",
+      age: 28,
+      interests: ["Music", "Art", "Travel"],
+      imageUrl:
+        "https://images.unsplash.com/photo-1678875922894-7d3210b0787d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
+    },
+    {
+      id: 1,
+      name: "Jane",
+      age: 25,
+      interests: ["Hiking", "Food", "Reading"],
+      imageUrl:
+        "https://images.unsplash.com/photo-1678875922894-7d3210b0787d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
+    },
+    // add more users here...
+  ];
+  return DEMO_CONTENT; 
Make a GET request to "/api/user/interest/{email}", where {email} is the email address of the user you are getting. Alternatively, pass the ID.

Expect a response that looks like our other API responses:

{ 
  'error' => 'Error message here for display'
}
or

{
  'success' => [
    {
      'activity' => Activity,
      'attitude' => Attitude,
      'skillLevel' => SkillLevel
    },
    {
      'activity' => Activity,
      'attitude' => Attitude,
      'skillLevel' => SkillLevel
    },
    {
      'activity' => Activity,
      'attitude' => Attitude,
      'skillLevel' => SkillLevel
    }
   ...
  ]
}
So you would make two requests to get the information you need:

One to get the profile information, such as the name, age, location, and profile picture
One to get their interests
You can make both requests at the same time and do a fork-join on them when they come back, or make the first request to build the card, wait for it to come back, and then update the component with the results of the second request via hooks. Up to you.

If you want, we can write a method to give you all of the data in one request.