### `About the project:`

This project is a job candidates app built with React JS for the frontend (creating a single-page application) and Express JS for the API server. The app consists of four main screens:

1. Signin: This screen provides a login form for users to sign in to their accounts. Users can also navigate to the signup page if they don't have an account.

2. Signup: The signup screen contains a registration form where users can create new accounts.

3. Candidates (Home Page): On this page, you can view a list of all the candidates stored in the system's database.

4. Candidate Profile: Clicking on a candidate's "Full Details" button from the home page leads to the candidate profile, where you can see detailed information about the selected candidate.

API Endpoints
The Express JS backend provides the following API endpoints to interact with the app:

POST /api/signin: Sign in with your credentials.
POST /api/signup: Create a new user account.
GET /api/candidates: Retrieve a list of all candidates.

Database
The project includes an SQLite database located in the ./express_server/src/db directory. The database contains two tables: user and candidate. You can use SQLite Data Browser to view the database structure and data

This project contains 3 branches. Please relate only to the "fullstack" branch, the other used for personal uses and consistency.
