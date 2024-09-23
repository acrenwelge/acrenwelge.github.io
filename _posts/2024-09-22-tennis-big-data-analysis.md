---
layout: post
title:  "Tennis Big Data Analysis (with BigQuery and Colab)"
date:   2024-09-22 12:00:00 -0600
categories: big-data 
---
This year I've been watching a lot of tennis matches and decided to dive into the data of current players to see what insights I could find. I used Google Cloud's BigQuery to analyze tennis match data. I found a dataset on [Github](https://github.com/JeffSackmann/tennis_atp/tree/master) that contained historical ATP tennis match data. I loaded the csv files of 2024 players, rankings, and matches into BigQuery and used [Google Colab](https://colab.research.google.com/drive/1SnD9xkkZ-BGHfpZ-DlyrVAEclH0zPVxr?usp=sharing) to run SQL queries on the data and visualize the results.

<!--end excerpt-->

The results were interesting! I will summarize the results below (see the [Colab notebook](https://colab.research.google.com/drive/1SnD9xkkZ-BGHfpZ-DlyrVAEclH0zPVxr?usp=sharing) for the full analysis):

- 91.6% of players are right-handed; 8.4% are left-handed
- The top 5 countries with the most tennis players are: USA, Australia, UK, Spain, then Germany
- What are the most common first names of tennis players? David, Daniel, John, Michael, and Peter
- Twice as many tournaments have been played on hard courts compared to clay courts this year
- Jannik Sinner has the highest win rate on hard courts; Sebastian Baez has the highest win rate on clay courts
- For Grand Slam matches, the average match winner is ranked 39; the average loser is ranked 83
