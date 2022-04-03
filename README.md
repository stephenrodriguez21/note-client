# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1. <br>
1. Make sure you have latest version of <b>Nodejs</b> installed on your machine.
2. Make sure to run back-end app(note-api)
3. run command `cd app`
4. run command `npm install && ng serve`

## Development server

Navigate to `http://localhost:4200/`.

# Note app design specs
![Screen Shot 2565-04-04 at 03 22 43](https://user-images.githubusercontent.com/91866412/161446976-3bd892b7-1d66-4ce2-8094-4fc40b57112b.png)
Note client allows user to view all blogs created by different authors. If the author wants to create a new blog or edit then he needs to login.
For demonstration purpose I have created 3 authors in the system. Since the postgres database is hosted on remote server.

Use this credentials to login to app(This app uses JWT token authentication)
1. username: author1@blog.com  password: 123456
2. username: author2@log.com  password: 123456
3. username: author3@log.com  password: 123456

## When you are logged in
![Screen Shot 2565-04-04 at 03 28 00](https://user-images.githubusercontent.com/91866412/161447193-3f411ac1-d6d4-4fe8-af24-d3ea41081cc7.png)

## When creating a new blog
![Screen Shot 2565-04-04 at 03 30 33](https://user-images.githubusercontent.com/91866412/161447309-ea4aba91-fd67-4790-9108-6ff3416cc589.png)

## When you try to edit/delete a blog created by another author, system will show error message
![Screen Shot 2565-04-04 at 03 35 11](https://user-images.githubusercontent.com/91866412/161447462-819f215e-61d7-466d-8fc0-728dd575de82.png)
