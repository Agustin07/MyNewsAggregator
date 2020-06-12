# My News Aggregator API

## Description

**News Module :** 
- Handle searches on NewsAPI, The Guardian and The New York Times' APIs.

**Auth Module :** 
- Handle login authentication and the authorization using JWT token for every endpoint of the API.

**Users Module :** 
- Handle the creation of an user account.

**ReadItLate Module:** 

- Handle saving and getting users' articles.
- Allows recommend article to another user, also users get the recommendations received.

### Sources:

-  [The Guardian API](https://open-platform.theguardian.com/)

-  [The New York Times API](https://developer.nytimes.com/)

-  [News API](https://newsapi.org/)

### Requirements:

| | VERSION |
|----------------|---------------|
|Node| ^12.16.3 |
|Typescript | ^3.7.4 |
|Nestjs | ^7.0.0 |
|@nestjs/config| ^0.5.0|
|psql (PostgreSQL)| ^9.4.4|

## Creating the database
Run the DBscript.sql file will create **"newsdb"**

```
\i DBscript.sql
```

>*important: an Admin user will be created! test login with it!*
>```
> {
>   "email": "admin@admin.com",
>   "password": "admin"
> }
>```

## Endpoints description

| **Endpoint** | **Description** |**AuthKey**| 
|--|--|--|
| POST `/users` | Create user account | No required |
| GET `/users` | Get all users registered | No required |
| POST `/login` | Authenticate user and retrieve an auth  key | No required |
| GET `/news` | Search news on NewsAPI, The Guardian and The New York Times' APIs. | Required |
| POST `/articles` | Save and article in the user account | Required |
|GET `/articles`| Retrieve the articles of the user |Required|
|POST `/recommendations`| Send a recommendation to another user |Required|
|GET `/recommendations`| Get the recommendations received|Required|


## Postman tests' documentation

**You can check endpoints' tests here:**

-  [My news Aggregator tests on Postman](https://documenter.getpostman.com/view/11476851/SzzgAzEB?version=latest)

## How to query news

### Endpoints URL:

```
http://localhost:3000/news
```

### Query parameters:

| PARAMETER | DESCRIPTION | EXAMPLE |
|----------------|---------------|-----------|
| api | Define the api in which you want to search for news or if you want to search using all. *options:*  `nyt`  `tg`  `news`  `all`| `api=nyt` |
| q | Request content containing this free text. Supports AND, OR and NOT operators.| `q=pizza` |
| oncontent | This query will look for matches in the body of the articles | `content=pineapple` |
| onsecton | Return only content in the sections | `onsecton=food` |
| fromdate | Return only content published on or after that date | `fromdate=2020-05-18` |
| todate | Return only content published on or before that date | `todate=2020-06-12` |
| onpage | Return only the result set from a particular page, must be a number | `onpage=1` |

**Examples :**

```
http://localhost:3000/news?api=nyt&q=pizza&oncontent=pineapple&onsection=food&fromdate=2020-05-18&todate=2020-06-12
```
Search only on The Guardians source
```
http://localhost:3000/news?q=music&api=tg
```
