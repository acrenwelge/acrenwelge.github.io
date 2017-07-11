---
layout: post
title:  "JavaScript Calculator"
date:   2016-12-10 12:00:00 -0600
categories: FreeCodeCamp
tags: Calculator Math CSS
---
This pen began as a FreeCodeCamp project. There were several user stories guiding the
development of the calculator:
<!--end excerpt-->

- I can add, subtract, multiply and divide two numbers.
- I can clear the input field with a clear button
- I can chain mathematical operations together until I hit the equal button, and the calculator will tell me the correct output

## The HTML
I used Bootstrap as a foundation for my layout and put all my markup inside a `.container`.
I then gave my calculator a title: `<h1>JS Super Calculator</h1>` and then put the
display inside `<div class="display">` and the keyboard inside... you guessed it,
`<div class="keyboard">`. Pretty simple.

## The CSS
I began by constructing the UI to make the calculator mainly white with a black
background, and a retro green monospace font on the display. Getting the keys
on the keyboard to fit was a bit tricky, especially with the "=" and "0" buttons being
larger than the rest. I had to use rows to lay out the keyboard and use
`display: flex; justify-content: space-between;` to align the spaces
properly. Then I used `position: relative` to adjust the bigger buttons individually.

## The Javascript
With the layout out of the way, I started on the Javascript code. I started by
creating variables for the current entry and operator, the current expression (to be displayed)
below the entry, and the previous entry and operator (to keep chaining operations).
The first and easiest task was to write a function `operate` that takes a first
number, an operator, and a second number as inputs and returns the result of the
operation like so:
{% highlight js %}
function operate(num1,op,num2) {
  var output;
  switch(op) { // use switch(op) to determine the operator: +,-,*, or /
    case '/':
      output = num1/num2; break;
    case '*':
      output = num1*num2; break;
    case '-':
      output = num1-num2; break;
    case '+':
      output = num1+num2; break;
  }
  return myRound(output);
}
function myRound(num) {
  return Math.round(Math.pow(10,5) * num)/Math.pow(10,5);
}
{% endhighlight %}

I also created a custom rounding function, `myRound`, which is shown above and rounds
floating point numbers to five decimal places. I needed this function because not
rounding would show too many significant figures and would move the number off the
screen.

My next task was to write a few event handlers that store the value of the button
that was clicked as a variable. Also in the click handler callback function I used
if/elseif statements to determine determine what to do with the input. If a numeral
or the decimal point is clicked, it is appended to the current entry. If the 'clear'
button was clicked, the entry and expression variables are reset and the view is
updated. If an operator is clicked, the function does nothing until the next number
is entered.

This callback function also had to handle chained expressions. For example, if
the expression "2+4&times;3" is entered, the operation "2+4" is performed once the
"&times;" operator is clicked (6 then becomes the value for the previous entry variable),
and then "6&times;3" operation is performed once the "=" button is clicked (and 18
now appears on the display). In this way, multiple operations can be strung together.

Other important cases, such as division by zero, are also handled. Dividing by zero
will show "Infinity" on the screen. If an operator is clicked immediately after
another was just clicked (such as "+" followed by "&times;"), the calculator
will not respond.

## What I Learned
Getting the exact look you want on the screen is tricky and sometimes requires a lot
of troubleshooting. I had to rework the styling on the whole calculator several times.
Also, coding a calculator was not as easy as I had thought - there are actually many
different scenarios to consider, especially when including chaining mathematical
functions together.

<p data-height="600" data-theme-id="0" data-slug-hash="dOjdqV" data-preview="true" data-default-tab="js,result" data-user="acrenwelge" data-embed-version="2" data-pen-title="JS Super-Calculator" class="codepen">
  See the Pen [Javascript Calculator](https://codepen.io/acrenwelge/pen/dOjdqV/) by Andrew ([@acrenwelge](https://codepen.io/acrenwelge)) on [CodePen](https://codepen.io).
</p>
