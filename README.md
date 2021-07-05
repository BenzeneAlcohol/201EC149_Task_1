Link to the repo: https://github.com/BenzeneAlcohol/201EC149_Task_1


# Installation
1. Clone the repository using 
`git clone https://github.com/BenzeneAlcohol/201EC149_Task_1.git`
2. run `npm install`
3. Open powershell if you are on windows or terminal on Mac/Linux, then type `mongod` to start the Mongo local server.
4. Next change the name of the database in the config->mongoose.js file if you want to.
5. type `nodemon index.js`
6. The server should be up and running at port 5000. MongoDB connected would appear in the terminal to show that DB has been connected.

# Folder setup
* config: Holds the mongoose.js file where the connection between the server and mongoDB is establihsed.
* controllers: Has all the functions that will be fired on accessing a specific route.
* middlware: Has the authentication middleware that will authenticate the user and allow access to private routes as well as store which user is accessing the route.
* models: Has the Mongoose Schema of the User and the Post, which has all the required functions and database fields.
* routes: Has the express router whcih redirects specific routes to specific controllers which will be fired on accessing those routes.

# Features
* Authentication through jwt tokens, highly secure. 
* bcryptjs used for hashing the password and saving it in database, only the hashed password is saved in the database, hence real password is never visible to database admin.
* All the CRUD operations are possible in this blog including a lot of additional features.
* Searching using specific tags and title is available.
* Creation, Deletion and Updation require authorization and are protected by a middleware.
* A user can like a post only once, and cannot like a post that he has created. Authentication middleware controls this.

# Routes
* `/api/auth`: Authentication route, used for login and registering.
* `/api/post`: All the APIs related to CRUD and other operations of posts will happen here
* `/api/user`: user related API such as posts created by the signed-in user.

# API docs
## APIs related to Posts

**1. Get all posts**
* **URL**
    `/api/post`

* **METHOD**
    `GET`
* **URL params**
   `none`

* **Success Response**<br />
    * **Code:** `200` <br />
      **data:** `{[all posts with the data of user who has created it]}`

* **Error Response**
    * **Code:** `500` <br />
      **Message:** `{success: false,
	  message: error.message}` <br />

* **Required Filed**
    * **Auth Required : False**

<br>
<br>

**2. Get specific post by ID**
* **URL**
    `/api/post/:id`

* **METHOD**
    `GET`
* **URL params**
    `id`
* **Success Response**<br />
    * **Code:** `200` <br />
      **data:** `{Post that was found by the specific ID}`

* **Error Responses**
    * **Code:** `401` <br />
      **Message:** `{ success: false,
                message: "Object ID invalid"}` <br />
	 * **Code:** `401` <br />
      **Message:** `{success: false,
            message: "No Post exists"}` <br />
	 * **Code:** `500` <br />
      **Message:** `{success: false,
                message: error.message}` <br />

* **Required Filed**
    * **Auth Required : False**
<br>
<br>


**3.  Get posts by specific tag**

* **URL**
    `/api/post/search/tag?`

* **METHOD**
    `GET`
	

* **URL query**
    `The tags written as: "/tag?tag=tag1 etc`<br/>
	Example: `http://localhost:5000/api/post/search/tag?tag=Check2`<br/>
	`**NOTE**:You should not use double quotes in the query params.`

* **Success Response**<br />
    * **Code:** `200` <br />
      **data:** `{[Posts which have all the tags mentioned.]}`<br/>
	  **data type:** Array of objects

* **Error Response** 
    * **Code:** `206` <br />
      **Message:** `No posts with such tags/combination of tags` <br /> 
    * **Code:** `400` <br />
      **Message:** `success: false,
            error: error.message` <br />

* **Required Filed**
    * **Auth Required : False**
 <br>
 <br>
 
**4. Get post by specific title**
* **URL**
    `/api/post/search/title?`

* **METHOD**
    `GET`
* **URL query**
    `The tags written as: "/title?title=title1" etc`<br/>
	Example: `http://localhost:5000/api/post/search/title?title=Hello%20Title`<br/>
	`**NOTE**:You should not use double quotes in the query params.`

* **Success Response**<br />
    * **Code:** `200` <br />
      **data:** `{Full post data with that specific title}`

* **Error Response**
    * **Code:** `206` <br />
      **Message:** `No post with that title found` <br /> 
    * **Code:** `400` <br />
      **Message:** `success: false,
            error: error.message` <br />

* **Required Filed**
     * **Auth Required : False**
     <br/>
	 <br/>
	 
 **5. Update post by specific ID**
* **URL**
    `/api/post/:id`

* **METHOD**
    `PUT`
	
* **URL params**
    `id`
	`**NOTE**: in the headers you have to authorize token and you can get token by signin API. Enter the header as: bearer authToken`

* **PASSED OBJETCS AS BODY** <br />
 **Needs all 3**
    `title,` <br />
    `desciption,` <br />
    `tags,` <br />

* **Success Response**<br />
    * **Code:** `201` <br />
      **data:** `            success: true,
            message: "Post has been updated successfully"`

* **Error Response**
    * **Code:** `400` <br />
      **Message:** `success: false,
                message: "You did not create the post, hence you are not allowed to update"` <br /> 
    * **Code:** `500` <br />
      **Message:** `success: false,
            error: error.message` <br />

* **Required Filed**
     * **Auth Required : True**
     <br/>
	 <br/>
	 
 
 **6. Delete post by specific ID**
* **URL**
    `/api/post/:id`

* **METHOD**
    `DELETE`
	
* **URL params**
    `id`
	`**NOTE**: in the headers you have to authorize token and you can get token by signin API. Enter the header as: bearer authToken`


* **Success Response**<br />
    * **Code:** `201` <br />
      **data:** `            success: true,
            message: "Post has been updated successfully"`

* **Error Response**
    * **Code:** `400` <br />
      **Message:** `success: false,
                message: "You did not create the post, hence you are not allowed to update"` <br /> 
    * **Code:** `500` <br />
      **Message:** `success: false,
            error: error.message` <br />

* **Required Filed**
     * **Auth Required : True**
<br/>
<br/>


**7. Creating a post**
* **URL**
    `/api/post/create`

* **METHOD**
    `POST`

	`**NOTE**: in the headers you have to authorize token and you can get token by signin API. Enter the header as: bearer authToken`
	
* **PASSED OBJETCS** <br />
    `title [required],` <br />
    `description [required],` <br />
    ` tags [required],` <br />

* **Success Response**<br />
    * **Code:** `201` <br />
      **Message:** `{Created post}` <br />
	  

* **Error Response**
    * **Code:** `500` <br />
      **Message:** `        success: false,
        error: err.message` <br />

* **Required Filed**
     * **Auth Need : True**
<br/>
<br/>

**8.  Like a specific post**

* **URL**
    `/api/polls/vote/:id`

* **METHOD**
    `POST`
	
	`**NOTE**: in the headers you have to authorize token and you can get token by signin API`

* **URL params**
    `particular post id`

* **Success Response**<br />
    * **Code:** `200` <br />
      **data:** `{"success": true, post}`

* **Error Response** 
    * **Code:** `401` <br />
      **Message:** `Object ID invalid` <br />
    * **Code:** `401` <br />
      **Message:** `post not found` <br />
    * **Code:** `400` <br />
      **Message:** `{"success": false, "message": "You have already liked once or are the creator of this post" }` <br />
    * **Code:** `400` <br />
      **Message:** `{"success": false, "message": error.message }` <br />

* **Required Filed**
    * **Auth Required : True**
 <br>
 <br>
 

## APIs related to Authentication
**1. Signup for the user**
* **URL**
    `/api/auth/regtister`

* **METHOD**
    `POST`

* **PASSED OBJETCS** <br />
    `username [required],` <br />
    `email [required],` <br />
    `password [required],` <br />

* **Success Response**<br />
    * **Code:** `201` <br />
      **Message:** `Success: true` <br />
      **data:** `token`

* **Error Response**
    * **Code:** `400` <br />
      **Message:** `success: false,
            error: e.message` <br />
			
<br/>
<br/>

**2. Login for the user**
* **URL**
    `/api/auth/login`

* **METHOD**
    `POST`

* **PASSED OBJETCS** <br />
    `email [required],` <br />
    `password [required],` <br />

* **Success Response**<br />
    * **Code:** `201` <br />
      **Message:** `Success: true` <br />
      **data:** `token`

* **Error Response**
    * **Code:** `400` <br />
      **Message:** `success: false,
            error: e.message` <br />


## APIs related to User
**1. Dashboard - Get all posts made by user**
* **URL**
    `/api/user`

* **METHOD**
    `GET`
	
* **URL params**
   `none`
   `**NOTE**: in the headers you have to authorize token and you can get token by signin API `

* **Success Response**<br />
    * **Code:** `200` <br />
      **data:** `{[all posts which the signed in user has created]}`

* **Error Response**
    * **Code:** `500` <br />
      **Message:** `{success: false,
	  message: error.message}` <br />

* **Required Filed**
    * **Auth Required : True**

<br>
<br>

**2. Get all posts made by user**
* **URL**
    `/api/user/:id`

* **METHOD**
    `GET`
	
* **URL params**
   `id`

* **Success Response**<br />
    * **Code:** `200` <br />
      **data:** `{user with that ID}`

* **Error Response**
    * **Code:** `500` <br />
      **Message:** `{success: false,
	  message: error.message}` <br />
    * **Code:** `206` <br />
      **Message:** `{success: false,
	  message: "user not found"}` <br />
    * **Code:** `401` <br />
      **Message:** `{success: false,
	  message: "Object ID invalid"}` <br />

* **Required Filed**
    * **Auth Required : False**

<br>
<br>