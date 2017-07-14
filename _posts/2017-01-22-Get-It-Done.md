---
layout: post
title:  "GetItDone: A To-Do List"
date:   2017-01-22 17:42:10 -0600
categories: Codepen
tags: Sass JavaScript jQuery-ui Mustache
---
I created a simple to-do list application which allows creating new tasks,
checking off and deleting completed tasks, and re-organizing the list any way
the user would like.
<!--end excerpt-->

## The HTML
I used [Mustache](http://mustache.github.io/) for templating and rendering the data,
and [jQueryUI](http://jqueryui.com) provided an API for user manipulation of the list.

## The CSS
I used [Sass](http://sass-lang.com) to store some color variables, and getting the hamburger buttons right
was all CSS:
{% highlight scss %}
.hamburger {
  display: inline-block;
  content: '';
  cursor: pointer;
  width: 15px;
  height: 15px;
  background: linear-gradient(
    to bottom,
    black, black 20%,
    transparent 20%, transparent 40%,
    black 40%, black 60%,
    transparent 60%, transparent 80%,
    black 80%, black 100%
  );
}
{% endhighlight %}
Using "Montserrat" as the font gave the list a nice look, too.

## The JavaScript
I began with a few tasks pre-loaded in my `data` variable, `$template` and `$target`
jQuery object variables for Mustache to render, and an `itemIndex` variable for
keeping track of the current item.
{% highlight js %}
var data = {
  "list": [
    {
      item: "First item",
      completed: false
    },
    {
      item: "Second item",
      completed: true
    },
    {
      item: "Third item",
      completed: false
    }
  ]
};
var $template = $('#template').html();
var $target = $('#target');
var itemIndex;
{% endhighlight %}

### Working with Mustache.js
First I needed a way for Mustache to render the content in my `data` variable, which
was simple enough. I created a template in the HTML like so:
{% highlight liquid %}
<script id="template" type="text/template">
  <ul>
    {% raw %}{{#list}}
    <li>
      <i class="hamburger"></i>
      <input class="checkbox" type="checkbox" {{#completed}}checked{{/completed}}/>
      <input class="text hide" type="text" />
      <span {{#completed}}class="checked"{{/completed}}>{{item}}</span>
    </li>
    {{/list}}{% endraw %}
  </ul>
</script>
{% endhighlight %}

Then, Mustache can take the data inside the `data` variable and render the output:
{% highlight js %}
function render() {
  var rendered = Mustache.render($template, data);
  $target.html(rendered);
}
{% endhighlight %}

Super nice and simple! Now that I have the data in my variable displayed on the page,
the next step is to add a function allowing me to add additional tasks. I retrieve
the value of the input field (`<input id="list-adder" type="text"/>`):
{% highlight js %}
function addItem() {
  var newItem = $('#list-adder').val(); // get the value out of the input field
  if (newItem !== '') { // as long as the field is not empty...
    data.list.push({ // add a new task to the list:
      item: newItem,
      completed: false
    });
    render();
    $('#list-adder').val(''); // Empty the input field after the new item is added
  }
}
{% endhighlight %}

I didn't have to add the new item to the DOM directly in my function, I just let
`render` handle that!

## What I Learned
Templating engines like Mustache.js really help when you want to abstract away something
like iterating through some data and displaying it. What I had to keep clear in my mind
when working on this app, though, was that the DOM and the JavaScript `data` variable
are two separate entities. I always made sure that `data` contained the correct information
whenever an action occurred (like updating a list item). Then, it's easy to simply call
the `render()` method and update the DOM.

<p data-height="500" data-theme-id="0" data-slug-hash="bgroGJ" data-default-tab="result" data-user="acrenwelge" data-embed-version="2" data-pen-title="GetItDone - A simple to do list" class="codepen">
  See the Pen [GetItDone](https://codepen.io/acrenwelge/pen/bgroGJ/) by Andrew ([@acrenwelge](https://codepen.io/acrenwelge)) on [CodePen](https://codepen.io).
</p>
