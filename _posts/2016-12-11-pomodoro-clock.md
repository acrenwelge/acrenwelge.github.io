---
layout: post
title:  "Pomodoro Clock"
date:   2016-12-11 12:00:00 -0600
categories: FreeCodeCamp
tags: Canvas, Javascript
---
This pen began as a FreeCodeCamp project to build a Pomodoro Clock, which is a
clock based on the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique).
The clock breaks work into intervals, typically 25 minutes long, and in between there
are short breaks. My clock does all of that, and you can also adjust the intervals.
After each interval, a sound plays to alert the user.
<!--end excerpt-->

I wrote the HTML markup in three sections: one for the title and start/stop/reset buttons, one
for the clock, and one for the clock settings below. I really had to fine-tune the CSS properties
of each element to get the layout looking the way I wanted. I used CSS Flexbox on the
top panel:
{% highlight css %}
.panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 100px;
}
{% endhighlight %}
I made the "+/-" buttons on the bottom settings panel be transparent with
`background-color: transparent`. Also, `cursor: pointer` makes buttons seem more...
buttony (is that even a word?) by making the mouse into a pointer when hovering.

With the CSS and HTML out of the way, I started on coding the actual clock, making it tick,
and providing interactivity with all the buttons. I began by initializing a few variables
that can also be changed as configuration settings, like the clock radius, colors,
and a URL to the sound file to be played:
{% highlight js %}
var clockRadius = 250;
var clockColors = ['blue','red','green'];
var invertColors = false; // change to true to invert colors in breaks
var isRunning = onBreak = settingChange = counterClockwise = false; // initialize booleans
var update; // this will be variable that updates DOM
var frac=0;
var wav = 'http://soundbible.com/grab.php?id=2154&type=mp3'; // sound file
var audio = new Audio(wav);
{% endhighlight %}

This is also one of my first projects to work on the HTML5 Canvas API, which lets
us draw some cool things on the `<canvas>` element. First, we have
to grab the DOM element with Javascript, get the context (2D in this case, since we
want to draw a flat object), and set the height and width of the canvas (this defines
the window in which we'll draw the clock):
{% highlight js %}
// initialize canvas settings:
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute('width', clockRadius);
canvas.setAttribute('height', clockRadius);
{% endhighlight %}

Next, I defined two functions which draw a path for the border of the clock. The command
`ctx.beginPath()` initiates a drawing path at the current location. Then
`ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)` creates an arc starting
at the coordinates (x,y) within the canvas rectangle defined above, with a given radius,
starting angle, and ending angle. The "anticlockwise" parameter is an optional boolean which
determines the direction of the arc.
{% highlight js %}
function drawBorder(){
  ctx.beginPath();
  ctx.arc(clockRadius/2,clockRadius/2,clockRadius/2-3,0,2*Math.PI,counterClockwise);
  ctx.lineWidth=5;
  ctx.strokeStyle=clockColors[0];
  ctx.stroke();
}
function drawArc() {
  var beginArc = -Math.PI/2;
  var endArc = -Math.PI/2 + frac*2*Math.PI;
  ctx.beginPath();
  ctx.arc(clockRadius/2,clockRadius/2,clockRadius/2-8,beginArc,endArc,counterClockwise);
  ctx.lineWidth=5;
  if (onBreak) {
    ctx.strokeStyle=clockColors[2];
  }
  else {
    ctx.strokeStyle=clockColors[1];
  }
  ctx.stroke();
}
{% endhighlight %}

Note how in the drawArc function, the ending angle is given as an expression with
the variable `frac`, allowing the length of the arc to change with the
variable. This will be important later. Also note how an if statement allows alternating
between different colors, depending on whether the clock is on a session or a break.

Another function called "refresh" takes the time displayed on the clock and decreases
the timer by one second. The time in seconds displayed is stored in the variable "start" and
unless the timer is done, the time is decreased by a second, and the variable "frac"
is recalculated. This will adjust the length of the arc on the clock.
{% highlight js %}
function refresh() {
  var start = convertTime($(".time").html());
  if (settingChange) {
    ctx.clearRect(0,0,clockRadius,clockRadius);
    drawBorder();
  }
  drawArc();
  if (start-1 < 1) {
    changeSession();
  }
  else {
    var now = convertToTime(start - 1);
    frac = 1-((start - 1) / beginTime);
    $('.time').html(now);
    return now;
  }
}
{% endhighlight %}

In the above code, two functions, `convertTime` and `convertToTime`, were invoked
to convert the time on the clock in the form "MM:SS" to an integer representing
the total seconds remaining (and vice versa). In the `convertTime` function,
the variable is split into an array by the ":" separator and the minutes and seconds
are stored in separate variables, so that the total number of seconds can be returned.
In the `convertToTime` function, the minutes left is found by dividing the total
number of seconds by 60, and rounding down. The remaining seconds are then prepended
with a 0 if it is less than 10; then, a string in the form "MM:SS" is returned and
displayed in the `refresh` function above.
{% highlight js %}
function convertTime(time) {
  if (isNaN(time)) {
    time = time.split(':');
    var min = time[0];
    var sec = time[1];
    return 60 * Number(min)+Number(sec);
  }
  else {
    return Number(time) * 60;
  }
}
function convertToTime(sec) {
  var min = Math.floor(sec / 60);
  var secRem = sec - min * 60;
  if (secRem < 10) {
    secRem = '0' + secRem;
  }
  return min + ':' + secRem;
}
{% endhighlight %}

There are several other functions, like `startClock`, `stopClock`, and `resetClock`
that are fairly straightforward and are triggered by clicking on the start, stop,
and reset buttons.

<p data-height="550" data-theme-id="0" data-slug-hash="dOqPrY" data-preview="true" data-default-tab="result" data-user="acrenwelge" data-embed-version="2" data-pen-title="Pomodoro Clock" class="codepen">
  See the Pen [Color Palette Generator](https://codepen.io/acrenwelge/pen/ZeqdZg/) by Andrew ([@acrenwelge](https://codepen.io/acrenwelge)) on [CodePen](https://codepen.io).
</p>
