---
layout: post
title:  "Wikipedia Search Page"
date:   2016-12-01 12:00:00 -0600
categories: FreeCodeCamp
tags: Bootstrap jQuery
---
This was one of the first pages I built on [Codepen](http://codepen.io). The concept
is simple - there is a field for entering search terms and a search button to get
the results. There is also a "random article" button that will open a random Wikipedia page.
<!--end excerpt-->

## The HTML
Making the UI was simple - two button and a search field.

## The CSS
The CSS was basic - I just used Bootstrap to make it look nice, then added some
styling to make it look nice. I also added background highlighting when hovering
for the search results.

## The JavaScript
On the JavaScript side, I used jQuery to store variables and open a simple AJAX
request to the Wikipedia API. Getting the query string from the input field was as simple as
`var $keywords = $('#query').get(0).value`. An ajax call is submitted with
jQuery's `$.ajax({...})`. In the "success" parameter of the object passed to
the ajax call, I wrote a callback function that gets all of the relevant data out of the JSON
object that is returned and displays them in a list below the search field. There is
even a snippet of each page as a preview displayed below the titles.

Implementing the random page button was even simpler. It's simply a link to
a URL on wikipedia that directs to a random page.

## What I Learned
Working with API's is really awesome and useful, and also very powerful!

<p data-height="500" data-theme-id="0" data-slug-hash="jVYNxY" data-default-tab="result" data-user="acrenwelge" data-embed-version="2" data-pen-title="Wikipedia Search" class="codepen">
  See the Pen [Wikipedia Search](https://codepen.io/acrenwelge/pen/jVYNxY/) by Andrew ([@acrenwelge](https://codepen.io/acrenwelge)) on [CodePen](https://codepen.io).
</p>
