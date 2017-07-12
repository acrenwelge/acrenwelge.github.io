---
layout: post
title:  "Color Palette Generator"
date:   2017-03-29 10:42:10 -0600
categories: Codepen
tags: Font-awesome Sass Javascript jQuery jscolor tinycolor
---
Well, I can't say that this palette generator page is my original idea because
I got the design inspiration [from another palette generator website](http://coolors.co),
but I definitely wrote my own code. There were several cool features about that
site that I wanted to emulate:
<!--end excerpt-->

- 5 colors vertically positioned across the screen
- Random generation with the click of a button
- Several themes to choose from (monochromatic, triad, etc)
- Ability to adjust hue, saturation, etc
- Drag and drop colors around

So I used several JavaScript tools ([jscolor](http://jscolor.com)
for the color picker, [tinycolor](https://github.com/bgrins/TinyColor/)
for manipulation of the colors in JavaScript, and [jquery](http://jquery.com)
for drag-and-drop) to build a functional sort-of replica that I can now use for
picking a color scheme for future projects.

I also added two extra features that I really like: the sliding bar on the right
side lets you use the buttons to adjust the color settings by any percentage
you want, and the animate button generates new colors every 2 seconds (but
that setting can be changed). Really awesome! :)

## The HTML
I organized the layout into an `.intro` div and several `.col` divs. I imported
Font-awesome to use with the buttons (of which there are many!). I used jscolor
as a color picker by adding a class `jscolor` to the HTML markup on each column:
`<input class="jscolor {hash: true}" value="#0000FF" />`. jscolor allows you to
set an arbitrary initial color using the hex code as shown above.

## The CSS
Gosh I love Sass, and using it here really helped! Not only did I use Sass variables,
but I also utilized the built-in color functions: `darken()`, `lighten()`, `saturate()`,
`invert()`, `grayscale()`, `adjust-hue()`, and `complement()`. Although color manipulation
was done with the Javascript plugins, I used these functions to style the buttons nicely.
I also used a media query `@media screen and (max-width: 730px) {...}` to hide some buttons
and options on smaller screens.

I also used an icon gallery called [Font Awesome](http://fontawesome.io) which added
some visual flare to my buttons.

## The Javascript
I used two Javascript libraries on this project:

* jscolor, for a color picker
* tinycolor, for performing operations on colors (lighten, darken, etc)

### Color Picker
First I wanted to be able to change the color of any column with the color picker.
The Javascript code for this is quite simple, actually:
{% highlight js %}
$(".jscolor").on('change', function(){
  var pickerColor = tinycolor($(this).val());
  var $col = $(this).closest('.col');
  updateColBg($col,pickerColor);
  checkLightness($col,pickerColor);
});
{% endhighlight %}

The function `updateColBg` updates the `background-color` of the column of the color
picker using the `.toRgbString()` method of tinycolor. The `checkLightness` function
determines if that color is light or dark. If it is light, the text color of the
column becomes black. Otherwise, the text color becomes white.
{% highlight js %}
function updateColBg(columnel,color) {
  columnel.css({"background-color": color.toRgbString()});
}
function checkLightness(columnel,color) {
  if (color.isLight()) {
    columnel.children().css({"color": "black"});
  }
  else {
    columnel.children().css({"color": "white"});
  }
}
{% endhighlight %}

### Randomizing the Colors
That's great! Now I can pick any color I want for each column. But what if I want
to generate all *random* colors? Well, the first step is getting one random color:
{% highlight js %}
function getRandColor(opts) {
  var rand1 = random(0,256);
  var rand2 = random(0,256);
  var rand3 = random(0,256);
  var alpha = Math.round(Math.random() * 100)/100;
  var regColor = "rgb("+rand1+","+rand2+","+rand3+")";
  var transColor = "rgba("+rand1+","+rand2+","+rand3+","+alpha+")";
  var color;
  if (opts.alpha) {
    color = transColor;
  }
  else {
    color = regColor;
  }
  return tinycolor(color);
}
{% endhighlight %}
By the way, the `opts` object passed in as a parameter contains boolean variables
regarding which, if any, options have been checked in the settings panel.

### Randomizing All Colors
Cool, now I can get a random color with one call to `getRandColor` and I'll get
a tinycolor object returned, which includes lots of helpful methods.

But what I really want now is to randomize **ALL** of the column colors when I press
the global randomize button. Not to worry! We just bind a click event to the button
and write the callback function with a `for` loop:
{% highlight js %}
$(".rand-all").on('click', function(){
  var end = $(".col").length;
  var opts = checkOptions();
  var combos = getColorCombos(opts);
  for (var i=0;i<end;i++) {
    currentColor = checkCombos(opts,combos,i);
    var $col = $(".col").eq(i);
    var tpin = $col.find(".tp-in");
    var tpout = $col.find(".tp-out");
    var alpha = currentColor.getAlpha();
    var tp = alphaToTp(alpha);
    updateTransSlider(tp,tpin,tpout);
    updatePicker($col,currentColor);
    updateColBg($col,currentColor);
    checkLightness($col,currentColor);
  }
});
{% endhighlight %}

#### Getting the `opts` Object
Remember that `opts` object? We get it from the `checkOptions` function, which checks
all the options in the settings panel above the columns:
{% highlight js %}
function checkOptions(){
  var includeAlpha = document.getElementById("alpha").checked;
  var mono = document.getElementById("mono").checked;
  var tetrad = document.getElementById("tetrad").checked;
  var analogous = document.getElementById("analogous").checked;
  var bool = mono || tetrad || analogous;
  return {
    combo: bool,
    alpha: includeAlpha,
    mono: mono,
    tetrad: tetrad,
    analogous: analogous
  };
}
{% endhighlight %}

Now that we have the `opts` object returned, we can pass it as a parameter to another
function, `getColorCombos`, which uses the methods in tinycolor.js to get sets of
colors (like analogous, monochromatic, or tetrad colors) given a starting color.

*Note: I added the **complement** to the tetrad colors to get a full 5 colors.*
{% highlight js %}
function getColorCombos(opts) {
  var startColor = getRandColor(opts);
  var aColors = tinycolor(startColor).analogous();
  var mColors = tinycolor(startColor).monochromatic();
  var tColors = tinycolor(startColor).tetrad();
  tColors.push(startColor.complement());
  return {
    monoColors: mColors,
    tetrColors: tColors,
    analColors: aColors
  };
}
{% endhighlight %}

#### Getting the Right Color Combo
Now that we know which of the color combinations we want (if any) given the `opts`
object, and we actually have all of those colors as objects, we can check which
color we need in the `for` loop above: `currentColor = checkCombos(opts,combos,i);`.
{% highlight js %}
function checkCombos(opts,combos,index) {
  if (opts.combo) {
      if (opts.mono) {
        return combos.monoColors[index];
      }
      else if (opts.tetrad) {
        return combos.tetrColors[index];
      }
      else if (opts.analogous) {
        return combos.analColors[index];
      }
    }
  else {
    return getRandColor(opts);
  }
}
{% endhighlight %}

### Modifying All Colors
Alright! Now we have a way to get all random colors for the five columns, including
optional color combos. But now we want to be able to modify all the currently displayed
colors of the five columns at once with buttons such as lighten, darken, saturate, spin, etc.

In order to do that, though, we need to be able to modify an individual color. We
do so with a function called `performColorOp`, which takes a color, an operation
(like lighten, darken, etc), and an integer percentage for adjustment as parameters
and returns the modified color.
{% highlight js %}
function performColorOp(color,operation, adj) {
  switch (operation) {
    case "lighten":
      return color.lighten(adj);
    case "brighten":
      return color.brighten(adj);
    case "darken":
      return color.darken(adj);
    case "desaturate":
      return color.desaturate(adj);
    case "saturate":
      return color.saturate(adj);
    case "greyscale":
      return color.greyscale();
    case "spin":
      var deg = adj/100*360;
      return color.spin(deg);
    case "complement":
      return color.complement();
    case "default":
      return color;
                   }
}
{% endhighlight %}

Now that we can modify a color in Javascript, we can write a function to adjust all
displayed colors with a given command. We again use a `for` loop and then get a
`var newcolor` inside the loop by calling `performColorOp`:
{% highlight js %}
function onGbAdjBtnPress(command) {
  var end = $(".col").length;
  var adjAmt = $(".adj-in").val();
  for (var i=0;i<end;i++) {
    var $col = $(".col").eq(i);
    var oldcolor = tinycolor($col.css('background-color'));
    var newcolor = performColorOp(oldcolor,command,adjAmt);
    updateColBg($col,newcolor);
    updatePicker($col,newcolor);
  }
}
{% endhighlight %}

### Dealing With Transparency
Sometimes we'd like to adjust the transparency of a color. With a range input in
the HTML markup, it's easy to specify via a jQuery event binding:
{% highlight js %}
$(".tp-in").on('input', function(){
  var $col = $(this).closest('.col');
  var $picker = $col.find(".jscolor");
  currentColor = tinycolor($picker.val());
  var tp = $(this).val()/1000;
  var tpin = $(this);
  var tpout = $col.find(".tp-out");
  var alpha = 1-tp;
  currentColor.setAlpha(alpha);
  updatePicker($col,currentColor);
  updateColBg($col,currentColor);
  checkLightness($col,currentColor);
  updateTransSlider(tp,tpin,tpout);
});
{% endhighlight %}

After the transparency is specified through the HTML `<input />` tag, the color's
`alpha` value (the opposite of transparency) is set with `var alpha = 1 - tp` and
then `currentColor.setAlpha(alpha)`. **Note: in my example, the input is scaled
from 0 to 1000 for smooth scrolling on the input.**

The column background is also updated just like last time, and the transparency
slider and numerical percentage shown is also updated via a simple function:
{% highlight js %}
function updateTransSlider(tp, tpInputEl, tpOutputEl) {
  var output = Math.round(tp * 100)/100;
  tpInputEl.val(tp*1000);
  tpOutputEl.text(output);
}
{% endhighlight %}

The color picker color is similarly updated:

{% highlight js %}
function updatePicker(columnEl, color) {
  columnEl.find('.jscolor').val(color.toHexString());
}
{% endhighlight %}

### Adjusting Colors Globally
Let's say instead of randomizing all the colors, we want to adjust them via one of
the top buttons (lighten, darken, etc). Remember the `onGbAdjBtnPress` function
from before which used `performColorOp` to change the color? We simply bind the
events now and pass in the command to perform:
{% highlight js %}
$(".lighten").click(function(){onGbAdjBtnPress("lighten")});
$(".brighten").click(function(){onGbAdjBtnPress("brighten")});
$(".darken").click(function(){onGbAdjBtnPress("darken")});
$(".desaturate").click(function(){onGbAdjBtnPress("desaturate")});
$(".saturate").click(function(){onGbAdjBtnPress("saturate")});
$(".grayscale").click(function(){onGbAdjBtnPress("greyscale")});
$(".spin").click(function(){onGbAdjBtnPress("spin")});
$(".complement").click(function(){onGbAdjBtnPress("complement")});
{% endhighlight %}

### Manipulating Single Colors
Binding an event to buttons on individual columns to randomize or manipulate a
single color is simple and analogous to the global functions discussed above.

### Animating Colors
I added my own custom animation feature which displays new random colors every
given interval (default `2s`).
{% highlight js %}
$(".animate").click(function(){
  if (vars.animClicks == 0) {
    vars.timer = setInterval(animate, vars.animSpeed);
  }
  vars.animClicks++;
});
$(".pause").click(function(){
  vars.stop = clearInterval(vars.timer);
  vars.animClicks = 0;
});
{% endhighlight %}

### Sorting with jQuery UI
I did some research on jQuery UI to see how to get things to drag and drop. It turns
out the library is easy to use (just like jQuery) after importing it. I simply
identified the containing element and used the `.sortable` like so:
{% highlight js %}
$(".container").sortable({
  handle: '.move',
  cancel: '' // override jquery-ui default
});
{% endhighlight %}
*Note that `.move` is the element that is clickable for moving.*

## What I Learned
Wow, definitely a lot! I think this project turned out easier than I initially
suspected, which is unusual. However, I did learn to work well with third party Javascript
tools and integrate them with my code (including scrutinizing the documentation). I
learned that adding features takes time, especially when it comes to working out all
the bugs.

<p data-height="800" data-theme-id="0" data-slug-hash="ZeqdZg" data-default-tab="result" data-user="acrenwelge" data-embed-version="2" data-pen-title="Color Palette Generator" class="codepen">
  See the Pen [Color Palette Generator](https://codepen.io/acrenwelge/pen/ZeqdZg/) by Andrew ([@acrenwelge](https://codepen.io/acrenwelge)) on [CodePen](https://codepen.io).
</p>
