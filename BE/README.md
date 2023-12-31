# BetterChess

### Description
- A chess website which combines the best features from multiple chess websites with a fresh user interface.
- Play versus a friend or a random person.
- Practice against an AI and challenge it when ready!
- Play different fun variants.

### Tech Stack
- Frontend
  - Typescript
  - ReactJS
  - Material UI
  - Redux
  - Chess.js
  - Stockfish.js
- Backend
  - Node.js
  - Express.js
  - MongoDB

### How to run
- Clone the project
- To run the frontend
  - Open a new terminal
  - Give the command: cd FE // FE is case-sensitive  
  - Give the command: npm install // this will install all the dependencies
  - Give the command: npm start // this will start the frontend application
- Backend
  - Open a new terminal
  - Give the command: cd BE // BE is case-sensitive
  - Create a .env file inside the BE folder, add the following 2 parameters:
    - MONGODB_URI = "MONGODB URI" // MONGODB_URI is case-sensitive
    - PORT = 8080 // PORT is case-sensitive
  - Give the command: npm install // this will install all the dependencies
  - Give the command: nodemon server.js // this will start the backend server
