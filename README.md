React Contact Management App

A simple Contact Management System built using **React**, **Material UI**,**React Query**,**Zustand** and **React hook form**. It supports CRUD operations, search, favorites filtering, and pagination.

## 🚀 Features
- 📄 View a paginated list of contacts.
- 🔍 Search contacts by name.
- ⭐ Mark/unmark contacts as favorites.
- ✏️ Edit and delete contacts.
- ➕ Add new contacts.
- ☑️ Filter by favorites.
- 💾 Backend mock with JSON Server.


## 📦 Installation<br>
1. **Clone the repository**<br>
git clone https://github.com/techsachin95/ContactApp.git

2. **Move to the Root project Directory**<br>
cd ContactApp

3. **Install Npm Package into Root Project Directory**<br>
npm install

4. **Run The Project From Root Directory**<br>
npm run dev

5. **Run The Json Server From Root Directory Of Project**<br>
npx json-server --watch db.json --port 3001 --routes routes.json


6.**End Points**<br>
GET     /api/contacts<br>          
POST    /api/contacts<br>          
PUT     /api/contacts/:id<br>      
DELETE  /api/contacts/:id<br>      

7. **Supports Pagination,search,Favorite filter**<br>
GET  /api/contacts?_page=2&_limit=10&q=John&favorite=true


