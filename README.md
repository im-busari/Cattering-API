### Cattering-API

Run commands:
- npm run dev: to start server
- npm test: to run tests inside app/test folder
- use cattering_client to run api from the console (commands available inside client/cattering_client.js)

----

Folder structure:

/app = everything related to the rest_api

/app/controllers = functions for both Meow and Cat related requests

/app/handlers

/app/test = 10 tests

/app/server.js = Our entry point - here we listen to the server


------
/client = Our CLI client 

/client/CatApi = our class where we have methods and send request to the server.

/client/config.json = place to save our current cat details

/client/cattering_client = handling console arguments 




