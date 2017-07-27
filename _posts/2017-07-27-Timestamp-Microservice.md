---
layout: post
title:  "Timestamp Microservice"
date:   2017-07-27 08:00:00 -0600
categories: FreeCodeCamp Back-end
tags: Node.js Express
---
I recently started working on the back-end certification for [FreeCodeCamp](http://freecodecamp.com)
and the first challenge is to build a simple application using Node.js and [Express][Express-link].
The app is a simple server and router which takes a URL string as a parameter and
returns both a Unix timestamp and a natural-language date (e.g. Jan 1, 2017).
<!--end excerpt-->

I've used Node before, but this was my first time trying out [Express][Express-link],
which is a web application framework for Node. So, to get started, we just `require(...)`
it like any other package in Node:

{% highlight js %}
const express = require('express');
const app = express();
const port = process.env.PORT; // <- this is the port that Express will listen to
{% endhighlight %}

Next, we want to route a `GET` request, which Express can do with `app.get('URL', function(request, response){...})`.
The first argument here is the URL string that the user enters into the navigation bar.
According to the Express documentation, we can use the pattern `/:var` to store the string as a
variable in `request.params.var`. The `request` and `response` arguments in the callback function
are useful for receiving a query and sending back a response to the client. Once we
analyze the `GET` request, we can send back data with `response.send(someObj)`.

In the code below, we get the `time` string parameter out of the `request.params` object.
If it *is* a number, we set the `date` variable with it using the `Date()` constructor;
or, if the URL string is already natural-language, we let *that* be the `date` variable
and use the `Date()` constructor and the `.valueOf()` method to get its Unix time.

{% highlight js %}
app.get('/:foo', function (req, res) {
  var time = req.params.foo;
  if (!isNaN(time)) {
    var date = new Date(Number(time)).toDateString();
  }
  else {
    var date = time;
    var time = new Date(date).valueOf().toString();
  }
  res.send({
    unix: time,
    natural: date
  });
})
{% endhighlight %}

Finally, we send an object in the response with the variables that we calculated
previously. Now we just need a way for the app to listen on a port, which we can do
simply with `app.listen()` and using the constant `port` we defined earlier:

{% highlight js %}
app.listen(port, function () {
  console.log('Listening on port '+ port +'!')
})
{% endhighlight %}

Now, we can go to the specified port (on my console it is 8080) and see that the
app is running. If we go to the address bar, we can pass in any number (Unix time) and see
the JSON response reporting the Unix timestamp and the natural-language equivalent.
If we pass in a natural date (like `/January 1, 2017`), we see that the response
again reports both. We don't even need to encode our URL string when we type it in!

**[Wanna try it out?](http://acrenwelge.github.io/timestamp)**

[Express-link]: http://expressjs.com
