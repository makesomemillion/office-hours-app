# Test

TDD and CI is relatively new for our group.
In past projects that our members were part of,
we either did not adhere to TDD and thus had no CI service running,
or another member of that group handled all of it.

For this project, we will assign one member to look into testing web apps.
They will learn and write tests for our front-end Angular code,
and set up Travis CI on our Dev and Master branches in our repository
to automatically run when a pull request is made.

## Front-end

Angular has the Jasmine testing framework built in.
The Angular CLI takes care of most of the configurations needed
for Jasmine and Karma and allows for additional configurations.
This allows us to setup Travis CI following
the [Angular testing documentations](https://angular.io/guide/testing#configure-project-for-travis-ci).

## Back-end

As we are using Nodejs/Express as our backend,
we have looked into some popular libraries for javascript unit testing. Mocha and Chai are two javascript unit testing libraries that is very commonly used.
[Mocha](https://mochajs.org/) is a testing framework
that runs on Nodejs and [Chai](https://www.chaijs.com/) is
 an assertion library that allows for easy comparison between results and expectations.
