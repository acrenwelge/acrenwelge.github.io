---
layout: post
title:  "Crypto CLI"
date: 2021-12-09 08:00:00 -0600
categories:
tags: Java
---
I was looking for a fun side project to work on recently, so - inspired by my fascination with cryptocurrencies - I came up with the idea of making a [CLI app](https://github.com/acrenwelge/crypto-cli) that can track cryptocurrency prices.
<!--end excerpt-->

I had a lot of fun working on this, and thanks to this cool [CLI framework](https://picocli.info/) I feel that this could be a real, production-ready app now. I used a free crypto-tracking API from [Coingecko](https://www.coingecko.com/en/api/documentation?) to query for data on different coins, their prices, market cap, and other metadata. I even have the ability to look up historical data - e.g. the price of a coin over the last 10 days.

One neat feature I built was the ability to configure a default coin and display currency that are loaded in from an external config file, but that you can set from the command line. I also configured caching of the list of supported coins so that the user can do a fast lookup of available coins.

I have a few ideas of extra features to add - price graphs from the terminal, regression analyses, and comparison of multiple cryptocurrencies - but to really take my crypto ambitions to the next level I could try to write a trading bot.
