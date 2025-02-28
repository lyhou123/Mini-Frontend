# Cambo Product

Cambod Product is a mini e-commerce platform where users can browse and purchase products. It includes features like product listing by category, adding items to the cart, and a checkout process. Admin users have access to an admin dashboard for managing products.

## Admin Access

When logging in as an **admin**, you will be automatically redirected to the **Admin Dashboard**. Use the following credentials to log in:

- **Email**: `admin@gmail.com`
- **Password**: `lyhou123`

This feature ensures that admin users can seamlessly access the admin panel to manage products and categories.

## Features

- **Product Listing**: View all available products.
- **Category Filtering**: Browse products by category.
- **Add to Cart**: Users can add products to their cart.
- **Checkout**: Complete the purchase process.
- **Authentication**:
  - User login and registration using JWT tokens.
  - Token-based authentication stored in cookies.
  - Secured using Spring Security.
- **Admin Dashboard**:
  - Admin users are redirected to an admin panel upon login.
  - Perform CRUD operations (Create, Read, Update, Delete) on products and categories.

## Pages

- **Home**: Displays all products.
- **Categories**: Allows filtering products by category.
- **Cart**: Shows added items and enables checkout.
- **Checkout**: Finalizes the purchase.
- **Admin Dashboard**: Manages product and category information.
- **Privacy Policy**: Details data handling policies.
- **About Us**: Provides information about the platform.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lyhou123/Mini-Frontend.git
2. **Navigate to the project directory**:
   ```bash
   cd Mini-Frontend
3. **Install dependencies:**:
   ```bash
   npm install
4. **tart the development server**:
   ```bash
   npm run dev

## Tech Stack

### Frontend
- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **Pinia**: A state management library for Vue.js.
- **VeeValidate**: A form validation library for Vue.js.

### Backend
- **Spring Boot**: A Java-based framework for building web applications and microservices.
- **Spring Security**: Provides authentication and authorization features.
- **JWT Authentication**: Token-based authentication for secure user sessions.

### Database
- **PostgreSQL**: A powerful, open-source relational database system.