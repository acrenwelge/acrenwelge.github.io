---
layout: post
title:  "JavaScript Calculator"
date:   2016-12-10 12:00:00 -0600
categories: FreeCodeCamp
---
This pen began as a FreeCodeCamp project. There were several user stories guiding the
development of the calculator:
<!--end excerpt-->

- I can add, subtract, multiply and divide two numbers.
- I can clear the input field with a clear button
- I can chain mathematical operations together until I hit the equal button, and the calculator will tell me the correct output

I began by constructing the UI to make the calculator mainly white with a black
background, and a retro green monospace font on the display. Getting the keys
on the keyboard to fit was a bit tricky, especially with the "=" and "0" buttons being
larger than the rest. I had to use rows to lay out the keyboard and use
`display: flex; justify-content: space-between;` to align the spaces
properly. Then I used `position: relative` to adjust the bigger buttons individually.

With the layout out of the way, I started on the Javascript code. I started by
creating variables for the current entry and operator, the current expression (to be displayed)
below the entry, and the previous entry and operator (to keep chaining operations).
The first and easiest task was to write a function that takes a first number, an operator,
and a second number as inputs and returns the result of the operation like so:
{% highlight js %}
function (num1,op,num2) {
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
  return output;
}
{% endhighlight %}

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

<p data-height="600" data-theme-id="0" data-slug-hash="dOjdqV" data-preview="true" data-default-tab="js,result" data-user="acrenwelge" data-embed-version="2" data-pen-title="JS Super-Calculator" class="codepen">
  See the Pen [Color Palette Generator](https://codepen.io/acrenwelge/pen/ZeqdZg/) by Andrew ([@acrenwelge](https://codepen.io/acrenwelge)) on [CodePen](https://codepen.io).
</p>