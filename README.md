🐾 PawMart
Pet Adoption & Supplies Management Platform

PawMart is a full-stack web application designed to streamline pet adoption and pet supply management. Users can browse listings, add and manage their own listings, place orders, and securely authenticate using Firebase. The application features a modern, responsive UI with global Dark/Light mode support.

🌐 Live Links

Client (Netlify):
https://pet-adoption-client.netlify.app/

Server (Vercel):
https://pet-adoption-server-eta-eight.vercel.app/

GitHub – Client:
https://github.com/coderamitdey/pet-adoption-client

GitHub – Server:
https://github.com/coderamitdey/pet-adoption-server

✨ Key Features

🔐 Secure Authentication using Firebase (Email & Password)

🐶 Pet Adoption & Pet Supplies Listings

➕ Add, ✏️ Update, ❌ Delete Listings

📋 My Listings Dashboard (User-specific)

🛒 Order Management System

📄 Download Orders as PDF

🌙 Dark / ☀️ Light Mode (Global UI)

🔎 Category-based Filtering

🧭 Protected Routes

📱 Fully Responsive Design

☁️ Cloud-based Deployment

🛠️ Tech Stack
Frontend

React

React Router

Tailwind CSS

DaisyUI

Axios

Firebase Authentication

SweetAlert2

jsPDF & jspdf-autotable

Vite

Backend

Node.js

Express.js

MongoDB (Atlas)

dotenv

CORS


🔐 Authentication & Security

Firebase Authentication for user login & registration

Protected routes for authenticated users

Environment variables used for sensitive credentials

Netlify domain added to Firebase Authorized Domains

🌗 Dark / Light Mode

Implemented using Tailwind CSS darkMode: 'class'

Theme applies globally across the entire application

User can toggle between Dark and Light modes seamlessly

🔌 API Endpoints (Overview)
Listings

GET /api/listings

POST /api/listings

PUT /api/listings/:id

DELETE /api/listings/:id

My Listings

GET /api/my-listings?email=user@email.com

Pets & Supplies

GET /api/pets_supplies

GET /api/pets_supplies/:id

Orders

GET /api/orders?email=user@email.com

POST /api/orders

DELETE /api/orders/:id

⚙️ Environment Variables
Client (.env)
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

Server (.env)
PORT=5000
MONGODB_URI=your_mongodb_connection_string

🧪 Run Locally
Client
git clone https://github.com/coderamitdey/pet-adoption-client
cd pet-adoption-client
npm install
npm run dev

Server
git clone https://github.com/coderamitdey/pet-adoption-server
cd pet-adoption-server
npm install
node index.js

🚀 Deployment

Frontend: Netlify

Backend: Vercel

Database: MongoDB Atlas

Make sure the deployed client domain is added to Firebase Authorized Domains.

👨‍💻 Author

Amit Dey
Bachelor of Science in Computer Science & Engineering
Junior Web Developer

GitHub: https://github.com/coderamitdey

📜 License

This project is intended for educational and learning purposes.