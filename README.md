# Library Management API

A comprehensive Library Management System built with Express.js, TypeScript, and MongoDB.

## Features

- ✅ Complete CRUD operations for books
- ✅ Book borrowing system with business logic
- ✅ MongoDB aggregation pipeline for borrowed books summary
- ✅ Mongoose static and instance methods
- ✅ Pre/post middleware hooks
- ✅ Advanced filtering and sorting
- ✅ Comprehensive validation
- ✅ Error handling
- ✅ TypeScript support

## Setup Instructions

1. **Clone and install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up environment variables:**
   Create a `.env` file with:
   \`\`\`
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/library-management
   NODE_ENV=development
   \`\`\`

3. **Start MongoDB:**
   Make sure MongoDB is running on your system.

4. **Run the application:**
   \`\`\`bash
   # Development mode
   npm run dev
   
   # Production build
   npm run build
   npm start
   \`\`\`

## API Endpoints

### Books
- `POST /api/books` - Create a new book
- `GET /api/books` - Get all books (with filtering/sorting)
- `GET /api/books/:bookId` - Get book by ID
- `PUT /api/books/:bookId` - Update book
- `DELETE /api/books/:bookId` - Delete book

### Borrowing
- `POST /api/borrow` - Borrow a book
- `GET /api/borrow` - Get borrowed books summary

## Query Parameters for GET /api/books

- `filter` - Filter by genre (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
- `sort` - Sort order (asc/desc)
- `sortBy` - Sort field (default: createdAt)
- `limit` - Number of results (default: 10)

Example: `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

## Technologies Used

- Express.js
- TypeScript
- MongoDB with Mongoose
- Zod Validator
- CORS
