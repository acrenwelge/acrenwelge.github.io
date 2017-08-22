---
layout: post
title:  "Code Refactoring"
date:   2017-07-27 08:00:00 -0600
categories: Refactoring
tags: JavaScript
---
Instead of starting another project, I thought that it's time to take a break and
look through the pages and pages of code I've already written to see what I can
improve or refactor. After all, I've learned quite a lot about the ins-and-outs of
JavaScript since I began all these projects (like reading
[this book series](https://github.com/getify/You-Dont-Know-JS)).
<!--end excerpt-->

At an overall design level, I started a lot of my code without a clear system in mind.
Usually, and especially on Codepen, I would just start writing functions, declaring variables,
and doing this all at the global scope. I'd heard of and seen a few examples of modular
JS, or even an IIFE (immediately invoked function expression), but it was always easier
to just start writing functions and not think about constructing a module.

So, in the name of refactoring, I started looking at code I had written like this:
{% highlight js %}
var a = 123;
var b = "foo";
function f1(p1,p2) {
  return (p1 + p2) *  (a + b);
}
{% endhighlight %}

And putting it inside a modular pattern like this:
{% highlight js %}
var myModule = {
  a: 123,
  b: "foo",
  f1: function(p1,p2) {
    return a + b
  }
}
{% endhighlight %}
