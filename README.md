# Project Overview:

Notebook is a comprehensive web application designed to manage and document backend development processes and resources. This tool helps developers and teams keep track of backend configurations, code snippets, API endpoints, server setups, and other critical backend development details. The application aims to enhance productivity, streamline collaboration, and ensure that backend development is well-documented and easily accessible.


# Folder Structure


```

├── client
│   ├── js
│   ├── bootstrap
│   ├── uploads
│   ├── model
|   ├───id.html
|   ├───login.html
|   ├───index.html  
|   ├───author.html
|   ├───signup.html
|   ├───search_email.html
|   ├───note.html
|   ├───dashboard.html
|   ├───index.html
|
├── server
     ├──────.gitignore
     ├──────modul.js(database)
     ├──────package-lock.json
     ├──────package.json
     ├──────server.js(main file)
     ├──────user.js(database)
     ├──────uuid.js 
         
```


# Technology Stack:

* Backend: Node.js with Express.js for server-side logic and RESTful API implementation.
* Database: MongoDB for storing project data, documentation, and user information.
* Frontend: Html,Css and Javascript for a responsive and dynamic user interface.
* Authentication: JWT (JSON Web Tokens) for secure user authentication.
* Deployment: Hosted on Render.com, configured to dynamically bind to the assigned port through environment variables.

# Getting Started:

* **Clone the Repository:**
  
```sh
 git clone https://github.com/avijitdas126/Notebook.git
 cd server
  ```
* **Install Dependencies:**
  

  ```sh
   npm install
  ```
* **Set Up Environment Variables:**
Create a .env file in the root directory and add the necessary environment variables:

```.env
secret_key="<secret_key(any string)>"

saltRound="<any_number>"

mongodb_url="mongodb+srv://<username>:<password>@cluster0.p2mfujl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Note"

port=8000
```
* **Start the Application:**

```sh
 npm start
```
The application will start and listen on the port specified in the PORT=8000 environment variable.

# License:

This project is licensed under the MIT License. See the LICENSE file for more details.

# Live our project:

[ Click Here](https://avijit-126.github.io/Frontend-notebook/)
 
# Api Documentation
 Coming Soon

 