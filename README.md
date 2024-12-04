## Getting Started
### To Run the App
```bash
docker-compose --profile app up
```
### To Test the App
```bash
docker-compose --profile test up
```
## Frontend Interface
`http://localhost:3000`

## Backend API

### Overview
This API provides a list of books categorized by the owner's age group (Adults or Children). The API also supports filtering by book type "Hardcover". 

### Base URL
`http://localhost:5000/api`

## Endpoints

### **GET /books**

#### Description:
Fetches a list of books categorized by the owner's age group (Adults or Children).

#### Headers:
- **x-api-key** _(required)_: A valid API key to access the endpoint.

#### Query Parameters:
- **filter** _(optional)_: A string that filters books based on type. For example, use `"hardcover"` to only return hardcover books.

#### Response:
Returns a JSON object with two categories: **Adults** and **Children**. Each category contains a list of books.

- **Success (200 OK)**:
```json
{
  "Adults": [
    {
      "Name": "Hamlet",
      "Type": "Hardcover"
    }
  ],
  "Children": [
    {
      "Name": "The Hobbit",
      "Type": "Ebook"
    }
  ]
}
```

- **Error (400 Bad Request)**:
```json
{"error":"Invalid filter provided. Valid options are: hardcover"}
```

- **Error (401 Unauthorized)**:
```json
{"error":"Invalid or missing API key"}
```

- **Error (429 Too Many Requests)**:
```json
{"error":"Too many requests from this IP, please try again later."}
```

- **Error (500 Internal Server Error)**:
```json
{"error":"Error fetching or processing books: Invalid data structure."}
```

## Assumptions
1. The external API returns a manageable amount of data that can be entirely fetched, stored, and processed in memory without causing performance bottlenecks.
2. The external API is always available and does not introduce downtime during usage except the 429 error.
3. The external API is reliable and trusted, no malicious input.
4. The application will be used by a small number of users at a time.
5. The application is for internal use only and the data being provided is shared voluntarily by individuals who are aware of its use.
6. Hardcover is the only book type we are interested in.
### Valid JSON Response:

The Bupa Coding Test API is expected to return valid JSON data in the following structure.
If the data returned from the API is not valid or the structure does not match the expected format, the application will fail to process the response.

#### Expected Data Structure:

The data from the API should be an array of objects, where each object represents an owner.

Each owner object must contain:

- name: A string representing the owner's name.

- age: A number representing the owner's age.

- books: An array of book objects associated with the owner. 

Each book object must contain:

- name: A string representing the book's title.

- type: A string representing the type of the book


