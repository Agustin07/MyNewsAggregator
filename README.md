# My News Aggregator API

## Description

- News Aggregator API Handle searches on The Guardian's and The New York Time's APIs.
- News Aggregator is able to filter from using The Guardian's or The New York Time's API.
- News Aggregator define a common interface for the responses of the APIS.
- Server runs on port 3000.
- On searching over The New York Times' source require a JWT key for authorization!


### Sources:
- [The Guardian API](https://open-platform.theguardian.com/)

- [The New York Times API](https://developer.nytimes.com/)

- [News API](https://newsapi.org/)

### Requirements:

|  | VERSION  |  
|----------------|---------------|
|Node|   ^12.16.3        |     
|Typescript        |    ^3.7.4       | 
|Nestjs        | ^7.0.0 |
|@nestjs/config| ^0.5.0| 

## Creating the database:

Run the DBscript.sql file will create **"newsdb"**

```
 \i DBscript.sql
```
>*important: Admin user will be created!*
>```
> {
>   "email": "admin@admin.com",
>   "password": "admin"
> }
>```

## Endpoints


## Postman test's documentation

**You can check endpoint's test here:**

- [My news Aggregator tests on Postman](https://documenter.getpostman.com/view/11476851/SzzgAzEB?version=latest)


## How to write a new agreggator request:

### Endpoints URL:

```
http://localhost:3000/news
```

### Query parameters:
| PARAMETER | DESCRIPTION  |  EXAMPLE |
|----------------|---------------|-----------|
| api  | Define the api in which you want to search for news or if you want to search using all. *options:* `nyt` `tg` `news` `all`|  `api=nyt`  | 
|	  q     | Request content containing this free text. Supports AND, OR and NOT operators.|  `q=pizza`  | 
|	  oncontent     |  This query will look for matches in the body of the articles |  `content=pineapple`  | 
| onsecton  | Return only content in the sections |  `onsecton=food`  | 
| fromdate  | Return only content published on or after that date |  `fromdate=01/01/2012`  | 
| todate  | Return only content published on or before that date |  `todate=10/12/2012`  | 
| onpage  | Return only the result set from a particular page, must be a number |  `onpage=1`  | 


**Examples :**

```
http://localhost:3000/news?api=nyt&q=pizza&oncontent=pineapple&onsection=food&fromdate=01/01/2012&todate=31/12/2012
```


```
http://localhost:3000/news?api=tg
```
