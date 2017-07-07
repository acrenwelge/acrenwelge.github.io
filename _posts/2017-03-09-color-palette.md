---
layout: post
title:  "Color Palette Generator"
date:   2017-03-29 10:42:10 -0600
categories: Codepen
---
Well, I can't say that this palette generator pen is my original idea because
I got the design inspiration [from another palette generator website](http://coolors.co),
but I definitely coded it myself. There were several cool features about that
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

I did add two extra features that I really like: the sliding bar on the right
side lets you use the buttons to adjust the color settings by any percentage
you want, and the animate button generates new colors every 2 seconds (but
that setting can be changed). Really awesome! :)

<p data-height="600" data-theme-id="0" data-slug-hash="ZeqdZg" data-default-tab="result" data-user="acrenwelge" data-embed-version="2" data-pen-title="Color Palette Generator" class="codepen">
  See the Pen [Color Palette Generator](https://codepen.io/acrenwelge/pen/ZeqdZg/) by Andrew ([@acrenwelge](https://codepen.io/acrenwelge)) on [CodePen](https://codepen.io).
</p>
