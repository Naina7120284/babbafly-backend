# BabbaFly Backend API

A robust RESTful API built with Node.js, Express, and MongoDB for the BabbaFly Marketplace.

## Features
- **User Management**: JWT-based Authentication (Register/Login) and Profile management.
- **Marketplace Listings**: Full CRUD for items with location and price data.
- **Categorization**: Group listings and fetch by category ID.
- **Order System**: Secure order placement with populated listing/seller details.
- **Advanced Search**: Filtering by price range/location and sorting by price/popularity.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT & Environment Variables

## 📡 Key Endpoints
- `POST /api/users/login` - Authenticate user
- `GET /api/listings` - Fetch all listings (Supports `?price=`, `?location=`, `?sort=`)
- `GET /api/listings/:id` - Fetch specific item details
- `POST /api/orders` - Place a new order (Protected)
