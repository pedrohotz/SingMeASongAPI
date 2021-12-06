# <h1 align="center">**API - Sing me a song**


## **About the project**

Sing me a song is API to post songs from youtube and get random or top songs recommendations ranked by 'points'. It is also possible to Upvote or Downvote a song. 

### **Routes**

- #### `GET /recommendations/random`
Response is 70% a random song recommendation above 10 in points and 30% a random song. Response example:
```json
[
  {
    "id": 8,
    "name": "Bon Jovi - Livin' On A Prayer",
    "ytblink": "https://www.youtube.com/watch?v=lDK9QqIzhwk",
    "points": 12
  }
]
```

- #### `GET /recommendations/top/:amount`
Response is the top *amount* recommendations ranked by points. Response example for amount = 3:
```json
[
  {
    "id": 8,
    "name": "Bon Jovi - Livin' On A Prayer",
    "ytblink": "https://www.youtube.com/watch?v=lDK9QqIzhwk",
    "points": 12
  },
  {
    "id": 9,
    "name": "Three Days Grace - Pain",
    "ytblink": "https://www.youtube.com/watch?v=Ud4HuAzHEUc",
    "points": 10
  },
    {
    "id": 10,
    "name": "Breaking The Habit - Linkin Park",
    "ytblink": "https://www.youtube.com/watch?v=v2H4l9RpkwM",
    "points": 8
  }
]
```

- #### `POST /recommendations`
**Requires a body** like: 
```json
{
    "name": "Bon Jovi - Livin' On A Prayer",
    "youtubeLink": "https://www.youtube.com/watch?v=lDK9QqIzhwk"
}
```

Response is the data of the posted body. Response example:
```json
[
  {
    "id": 8,
    "name": "Bon Jovi - Livin' On A Prayer",
    "ytblink": "https://www.youtube.com/watch?v=lDK9QqIzhwk",
    "points": 0
  }
]
```

- #### `POST /recommendations/:id/upvote`
Increases the points of recommendation by 1. <br>
Response is the data of the upvoted recommendation. Response example for id = 8:
```json
[
  {
    "id": 8,
    "name": "Bon Jovi - Livin' On A Prayer",
    "ytblink": "https://www.youtube.com/watch?v=lDK9QqIzhwk",
    "points": 1
  }
]
```

- #### `POST /recommendations/:id/downvote`
Decreases the points of recommendation by 1. If a recommendation gets below -5 points, it is deleted from the DB <br>
Response is the data of the downvoted recommendation (for deleted ones is 400 status code). Response example for id = 8:
```json
[
  {
    "id": 8,
    "name": "Bon Jovi - Livin' On A Prayer",
    "ytblink": "https://www.youtube.com/watch?v=lDK9QqIzhwk",
    "points": 0
  }
]
```

# Tech Stack

The following tools were used in the construction of the project-api:

**Server**  ([NodeJS](https://nodejs.org/en/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[Joi](https://github.com/hapijs/joi)**
-   **[Eslint - Airbnb](https://github.com/airbnb/javascript)**
-   **[Jest](https://github.com/facebook/jest)**
-   **[Supertest](https://github.com/visionmedia/supertest)**
-   **[PostgreSQL](https://www.postgresql.org/)**


**Utilities**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
---


 <br />

## **Getting Started**

### **Prerequisites**

- npm

<br />

### **Installation**

1.  Clone this repository

```sh
https://github.com/pedrohotz/SingMeASongAPI.git
```

2. Install the dependencies executing command

```sh
npm i
```

3. Create a .env file in folder (root) like the .env.example file and fill with your values. 

4. Create a postgres database.

   <br />

5. Run dump to populate DB.

   <br />
   <br />

### **How to run**

1. Start the API

```sh
npm run start
```
2. To run Tests

```sh
npm run test
```

## How to contribute

1. Fork the project.
2. Create a new branch with your changes: `git checkout -b feat/myFeatureName`
3. For each feature implemented, make a commit specifying what was done
4. Submit your changes: `git push -u origin feat/myFeatureName`

---
## Author

Developed by Pedro Hotz Bronzato.