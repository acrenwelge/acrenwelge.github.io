---
layout: post
title:  "Revature Family Tree"
date: 2021-01-20 08:00:00 -0600
categories:
tags: AWS JavaScript React Preact
---
At my workplace we have a sort of "family tree" - when people are hired onto our team
from one of our programs, their trainer becomes their "parent". So we have several
"generations" and branches of our family tree that keep growing when our team expands.
<!--end excerpt-->
Previously we kept track of this in a PDF file, but it soon became outdated. I had the idea
of making a website that would show all this data in a tree structure that you can
interact with. So over the weekend I created [The Revature Family Tree](http://revature-family-tree.s3-website-us-east-1.amazonaws.com) which is hosted on AWS S3.

The first iteration was simple - I used the [Treant](https://fperucic.github.io/treant-js/) library
with the values hard-coded in the configuration. Soon, however, I wanted to add more features - color coding
the nodes on the tree by their position, showing / hiding positions, and toggling to show our team structure.
I started with vanilla JavaScript, using manual DOM manipulation to restructure the
nested chart configuration object. This worked for a while, but the code became pretty
messy and unmaintainable.

Recently I revisited the project to refactor a few things:

* Externalize the configuration data and read it into the app
* Use a framework for modularity and state management
* Remove unnecessary DOM manipulation

I used [Preact](https://preactjs.com) for a framework. It's a lighterweight alternative
to React, with mostly the same API. It's convenient for this project because I can
use it without needing to install any build tools. I can make a quick change and
sync the folder with my S3 bucket without bothering with `npm`.

I also externalized the team data by storing it in a CSV file, using the `fetch`
API to read it in, and storing it in state. I then have filters that are controlled
by the toggles on the page, and a chart re-render is triggered when any of the
toggles are clicked. The chart configuration is filled by filtering the employee
data by the state of the filters.

This project really taught me how to integrate with an external library, externalize
configuration data, and refactor an existing application to use a framework and
improve modularity.
