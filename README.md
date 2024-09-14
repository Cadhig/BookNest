# BookNest
BookNest is a platform where book lovers can connect! Users will be able to search books by author or title, create social media posts, follow other users, add books to their TBR, customize their profile, and more!

## 📚 Features
📖 **Book Search**: Search for your favorite titles using keywords, author name, or title.

📖 **Bookmarks**: Save your favorite reads to your profile. 

📖 **Connect with Others**: Create posts, view / like other users posts and view others bookmarks

📖 **Profile Customization**: Customize your profile with a personalized bio, location, birthday, and profile / cover pictures.

## Tech used
📐 **Frameworks**: React

💾 **Database**: MongoDB 

🛠 **Tools**: Express, Express-Session, Mongoose, TailwindCss

🌐 **API** <a href="https://developers.google.com/books">Google Books</a>

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

1. Clone this repository:

   ```bash
   clone https://github.com/Cadhig/BookNest.git
   ```

2. Open two terminals, In terminal 1:

   ```bash
   cd client; npm install
   ```

3. In terminal 2:

   ```bash
   cd server; npm install
   ```

4. Set up your <a href="https://developers.google.com/books">Google for Developers</a> account to obtain an API key for Google Books. Then, create a `.env` file within the `client` directory:

   ```
   VITE_GOOGLE_API_KEY="YourAPIKey"
    VITE_API_ROUTE="http://localhost:3000"
   ```

5. Create another `.env` file within the `server` directory:
   ```
   MONGO_URL="YourMongoDBUrl" # Mine is mongodb://localhost/BookNest
   ORIGIN="http://localhost:5173"
   PORT="3000"
   ```

6. To view the project in the browser... Open the `client` directory and run:
   ```
   npm run dev
   ```

7. To begin the backend server... Open the `server` directory and run:
   ```
   npm start
   ```

8. Open your browser and navigate to: `http://localhost:5173`

## 🤝 Contributions

Contributions are welcome! If you have any suggestions or improvements, feel free to fork the repository, create a new branch, and submit a pull request.

**This app is not yet completed and is still a work in progress**
