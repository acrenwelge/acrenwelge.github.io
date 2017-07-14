---
layout: post
title:  "CSS Loaders"
date:   2017-02-23 12:12:10 -0600
categories: Codepen
tags: Sass CSS Animation
---
I've always found CSS to be quite powerful for performing smooth animations
so after messing around with various `@keyframe` animations on Codepen,
I thought I'd make some loader animations.
<!--end excerpt-->

## The HTML
I made a `<div class="box">` as a container for each animation. Within each box, there is a
`<div class="loader">`. Each colored section or each dot within the loader uses a `span`
for markup, and all animation is done with CSS.

## The CSS
This is where the fun really happens on this pen! I used [Sass](http://sass-lang.com) to set a ton of variables
which act as configuration settings, so they can be changed for different effects.
For example, changing the `$speed` variable changes the animation speed of all the
spinners. Also, I created many `@keyframe` animations and reused some on several different
elements.

### Types of Loaders
First I styled a basic thin taurus with a quarter chunk of it colored in and
rolling around it. I added another quarter on the opposite side for the next
animation, and then half of the taurus for the third.

Next, I experimented with animating three dots, floating up in order, fading in
and out, and circling around a point in various manners. A simple change of
the `animation-direction` and `animation-timing-function` CSS properties changes
each animation dramatically, and many different animations can be shown by
combinations of these properties.

The last type of spinner was inspired by Google's chrome logo, with yellow,
red, green, and blue as four different layers of color. I especially enjoyed
the spinners where the layers merge and separate, creating a cool overlapping
effect.

## What I Learned
This has been one of the most fun pens I've coded so far. Using Sass greatly eased
my workload on CSS by keeping my code DRY, and I learned how simple changes to a
single CSS property can make all the difference. Maybe I'll use one of these spinners
on a future project.

<p data-height="550" data-theme-id="0" data-slug-hash="vxYeQr" data-preview="true" data-default-tab="css,result" data-user="acrenwelge" data-embed-version="2" data-pen-title="Loaders" class="codepen">
  See the Pen [CSS Loaders](https://codepen.io/acrenwelge/pen/vxYeQr/) by Andrew ([@acrenwelge](https://codepen.io/acrenwelge)) on [CodePen](https://codepen.io).
</p>
