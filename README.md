Here's a `README.md` template for your project:

````markdown
# Backend Project

This is a Node.js-based backend application connected to a MySQL database. It includes CRUD operations for managing users and is structured to demonstrate RESTful API development.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** (Node Package Manager)
- **Postman** (optional, for testing APIs)

## Clone the Repository

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/trchristianquiambao/backend.git
   cd backend
   ```
````

2. If you don’t have a repository yet, you can initialize a new one.

## Installation

1. Install the required dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory of the project, and add the following database configuration values:

   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=backend
   DB_PORT=3306
   LOCAL_HOST=http://localhost:3000
   PORT=3000
   ```

   Replace `your_mysql_username` and `your_mysql_password` with your actual MySQL credentials.

## Database Setup

1. Create a new database in MySQL (e.g., `backend`):

   ```sql
   CREATE DATABASE backend;
   ```

2. Create the necessary table (`user_tbl`):

   ```sql
   CREATE TABLE user_tbl (
     user_id INT AUTO_INCREMENT PRIMARY KEY,
     user_fname VARCHAR(255) NOT NULL,
     user_lname VARCHAR(255) NOT NULL,
     user_isdel INT DEFAULT 0
   );
   ```

3. Ensure the MySQL service is running:

   ```bash
   sudo service mysql start
   ```

## Running the Application

1. Start the backend server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

2. You should see the following output:

   ```
   Listening to port 3000
   ```

## API Documentation

The application uses Swagger UI for API documentation. To view the API documentation, open the following URL in your browser:

```
http://localhost:3000/api-docs
```

### Endpoints

- **GET /hello**: Returns "Hello World" message.
- **POST /api/user**: Creates a new user.
- **GET /api/user**: Retrieves all users.
- **PUT /api/user/:id**: Updates a user by ID.
- **DELETE /api/user/:id**: Deletes a user by ID.

## Testing the APIs using Postman

1. Open **Postman** and set the following request types:

   - **POST**: `http://localhost:3000/api/user`

     - Body (Raw JSON):

     ```json
     {
       "user_fname": "Alice",
       "user_lname": "Smith",
       "user_isdel": 0
     }
     ```

   - **GET**: `http://localhost:3000/api/user`

   - **PUT**: `http://localhost:3000/api/user/:id`

     - Body (Raw JSON):

     ```json
     {
       "user_fname": "Updated Name",
       "user_lname": "Updated Lastname"
     }
     ```

   - **DELETE**: `http://localhost:3000/api/user/:id`

## Troubleshooting

1. **MySQL connection issues**: Ensure MySQL is running and the `.env` file has the correct database credentials.

2. **Swagger UI not working**: Check that the server is running on port 3000 and navigate to `http://localhost:3000/api-docs` to view the documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy coding!

```

---

This `README.md` provides a clear guide on how to clone, set up, and run your backend application. Feel free to edit it as needed!

Let me know if you need any modifications or further help!
```
