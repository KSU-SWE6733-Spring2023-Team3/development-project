# CI Tool Review

Part of our [Sprint 2](README.md) deliverables is to integrate Continuous Integration (CI). To do this, we reviewed available options and discussed based on the following criteria: 
* Integration with Github
* Integration with our tech stack
* Monetary Cost
* Setup difficulty

---

## Conclusion

Our team decided to move forward implementing [Hosted Github Actions](#hosted-github-actions). It presented the best optimization between integration with the code repository, integration with our tech stack, cost, and setup difficulty.

We are accepting the risk that containerizing each portion of the component will be something manageable in the short timeframe we have. To accomplish this, we are going to move forward in the following direction: 
1. Run [API unit tests](../../api/tests/Feature) on every branch commit
2. Run [API unit tests](../../api/tests/Feature) on pull request create
3. Run [Behavior Driven Tests](../../tests) on pull request create and after [API unit tests](../../api/tests/Feature)
4. Run any [GUI Tests](../../gui) on pull request create after [Behavior Driven Tests](../../tests) 
5. Run all tests against the main branch nightly.

Following this outline will ensure we are still making incremental progress with our CI.


We know we are accepting some amount of risk because of the differences between how the application is being tested and how the application is being run, but that is a risk we are willing to take.

---

## Tools Reviewed

We reviewed the following tools. Summaries of each review can be found in their respective sections. 

* [Hosted Github Actions](#hosted-github-actions)
* [Self-Managed Github Actions](#self-managed-github-actions)
* [Google Cloud Build](#google-cloud-build)
* [Travis CI](#travis-ci)
* [Circle CI](#circle-ci)
---

## Hosted Github Actions

[Github actions](https://docs.github.com/en/actions) are a relatively new part of Gitlab that will integrate well with the code repository. They have lots of documentation for pre-built runners, and will allow you to run on their hardware.

There is a [Laravel starter workflow](https://github.com/actions/starter-workflows/blob/main/ci/laravel.yml) that we can use as a good starting point. However, it seems this requires a container to run, or at least instructions to build a Dockerfile.

One challenge we always face in containerization is how to get secrets into the container. Things like the database password should not be stored in the repo, and Docker has ways to inject them. [Github Secrets](https://github.com/Azure/actions-workflow-samples/blob/master/assets/create-secrets-for-GitHub-workflows.md) will allow us to inject things like IP addresses and database passwords securely.

In it's current state, our application is split up into three components: [API](../../api), [GUI](../../gui), and [Tests](../../tests). Therefore, we need three different operations to carry out before we can say a change is "valid". 

Github allows you to run tests on their hardware, but you are subject to the [resource limits](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions). We shouldn't go over these, so we project the total monetary cost would be free.

### Conclusion

Given our small team size and lack of experience building containers, it may be a bridge too far to attempt to implement this. However, there are clear examples on how to make it work for different elements in our tech stack.

## Self-Managed Github Actions

As with [Hosted Github Actions](#hosted-github-actions), Github provides a way for you to build a [self-managed runner](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners). Instead of providing a workflow for Github to interpret, you build your own server and allow communication to Github. 

Instead of having to build three separate containers, you build one server to run all three test suites. This would probably be more beneficial in the short term, but would require more upkeep and maintenance in the long run. 

There is no difference in integration with Github itself, you still provide workflow (albeit much simpler), most likely something that says "Run this shell script". 

We would be responsible for paying to run the server. Something like the [AWS free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all) could obviate any cost we would face. Unfortunately, our infrastructure is currently hosted in Google Cloud.

### Conclusion

[Self-Managed Github Actions](#self-managed-github-actions) are a good way to get up and running quickly, but are not the long-term solution. We should be striving for something more robust.

## Google Cloud Build

[Google Cloud Build](https://cloud.google.com/build) is Google's Serverless CI offering. You specify a container to build, where the container registry is, all of the normal stuff, and Cloud Build runs the configurations you tell it. 

Google offers [integration with Github](https://cloud.google.com/build/docs/automating-builds/github/build-repos-from-github) for Cloud Build, that will receive events from Github and execute the build process. This is very similar to [Hosted Github Actions](#hosted-github-actions), but is probably a bit more intensive.

As already discussed with containerization, there is the problem of injecting secrets into the container. Google Cloud Build integrates with [Google Secrets Manager](https://cloud.google.com/secret-manager), allowing you to securely pass data to the build container at runtime.

Cloud Build allows [120 minutes](https://cloud.google.com/build/pricing) of runtime per day for free on their e2-medium machines, which would be plenty for our purposes.

### Conclusion

Although the price of Cloud Build is not preventative, and integration with the tech stack and repo is similar to other options, Cloud Build presents a larger problem set of efficiently managing the Google Cloud infrastructure, which we don't feel is appropriate to address for the size and duration of this project. 

## Travis CI
[Travis CI](https://www.travis-ci.com/) is one of the most popular CI frameworks available. We would be ignorant to not give it a fair comparison.

Travis CI integrates [easily with Github](https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci-using-github). This is about the same amount of work as other offerings, and only slightly more work than using the Github offered solutions. This is not preventative.

Travis CI will integrate well with our tech stack. We will likely be forced into containers, or at least into the virtual environment Travis presents. This is the same as other options.

According to the [Travis CI pricing documents](https://www.travis-ci.com/pricing-cloud/), the minimum cost is $69/mo. This is not a trivial amount to spend for the remainder of the semester. 

Travis is probably the most work to set up, although once the repo integration is done it will likely be similar in terms of maintenance. 

### Conclusion

The biggest issue is the cost of using Travis CI. $69 is not something we want to spend for the project.

## Circle CI
[Circle CI](https://circleci.com/) is a relatively new choice in the CI world that doesn't have the legacy things like [Travis CI](#travis-ci) does, but is still quite popular.

Circle CI offers the same integrations and features as other CI services, including secret protection and secure pipelines.

Like other CI services, it depends on a container to be built, credentials passed in, and steps run. Integrating our tech stack and standing up Circle CI is similar to other options. 

The [pricing guide](https://circleci.com/pricing/) lets us know there is a free tier we can use, giving 6000 build minutes per month, or roughly 3 build hours per day.

### Conclusion

Circle CI provides all of the same offerings as others. The advantage of Circle CI over [Travis CI](#travis-ci) is the free tier.
