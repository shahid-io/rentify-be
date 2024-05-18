# Rentify Backend

Welcome to the backend repository for Rentify, a platform designed to streamline the process of renting properties. This repository contains all the necessary backend code including APIs for handling property listings, user management, and authentication.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

```bash
node -v
npm -v
Installing
A step-by-step series of examples that tell you how to get a development environment running:

Clone the repo:

```

git clone <https://github.com/shahid-io/rentify-be.git>
Install NPM packages:

# Property Management API

Welcome to the Property Management API repository. This API allows for robust management of property listings, including operations such as creating, retrieving, updating, and deleting properties. It's designed to cater to both sellers who wish to list their properties and buyers interested in viewing listings.

### Property API

- GET /properties/: Fetch all properties.
- GET /properties/:id: Fetch all properties for a specific seller.
- POST /properties/: Create a new property listing.
- PUT /properties/:id: Update an existing property listing.
- DELETE /properties/:id: Delete a property listing.

Built With

- Node.js - The runtime environment
- Express - The web framework used
- MongoDB - Database

Authors
Shahid - Initial work - shahid-io
