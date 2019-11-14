# Functional-programming 
Repository for the functional programming course

[![Netlify Status](https://api.netlify.com/api/v1/badges/43248ba6-c26d-4375-a94c-d4e2d4f76de6/deploy-status)](https://app.netlify.com/sites/wizardly-lovelace-12c5cc/deploys)

## Table of contents
* [Concept](#concept)
* [Installing](#installing)
* [Credits](#credits)

## Concept
The concept of this appliction revolves around the weapons collection of the NMVW. I want to show where the most weapons have been found based on the geonames that are pared with the objects, and show wich type of weapon where most found in a specific area. I got my inspiration for this concept from [Trulia](https://www.trulia.com/research/where-are-house-hunters-searching/), here they show where people are searching for a new home.

The circle that is displayed on the map where weapons have been found will grow depending on how many weapons have been found in that erea.

### Early concept sketches
<img src="dist/images/github-images/concept-schets1.jpeg">
<img src="dist/images/github-images/concept-schets1-hover.jpeg">
<img src="dist/images/github-images/concept-schets2.jpeg">

### Benodigde data
* Objects of the weapon category
* Geonames pared with those objects
* Type of weapon

## Installing
Clone the repository into your project folder
```
git clone https://github.com/damian1997/frontend-applications.git
```

Install packages
```
npm install
```

### data cleaning script install
To use the datacleaning script you have to run the following commands inside your directory via terminal

```
mkdir data
mkdir output
```

## Credits
Credits go out to [Laurens](https://github.com/Razpudding), [Danny](https://github.com/dandevri) and Robert (have not been able to find your github *SADFACE*) for profiding us with all the information we need to get through this course.