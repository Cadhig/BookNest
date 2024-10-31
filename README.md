# BookNest
BookNest is a platform where book lovers can connect! Users will be able to search books by author or title, create social media posts, follow other users, add books to their TBR, customize their profile, and more!

⭐ **This app is still a work in progress**

## 📚 Features
📖 **Book Search**: Search for your favorite titles using keywords, author name, or title.

📖 **Bookmarks**: Save your favorite reads to your profile. 

📖 **Connect with Others**: Create posts, view / like other users posts and view others bookmarks

📖 **Profile Customization**: Customize your profile with a personalized bio, location, birthday, and profile / cover pictures.

📖 **Reviews**: Review books, and view other users book reviews.

## Tech used
📐 **Frameworks**: React

💾 **Databases**: MongoDB, AWS S3 

🛠 **Tools**: Express, Express-Session, Mongoose, TailwindCss

🌐 **APIs**: <a href="https://developers.google.com/books">Google Books</a>

## ⚙️ Installation & Setup

To view this application on the web, click <a href="https://booknest-frontend-production.up.railway.app/">here</a>


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
5. Create an <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html">AWS S3 bucket</a>, with an <a href="https://aws.amazon.com/iam/">IAM</a> user / policy, grab your `access key`, `secret acccess key` as well as the name of your s3 bucket and region.

   Need help? 
   - <a href="https://youtu.be/yGYeYJpRWPM?si=DjMfOZrNZ5Uysyfl&t=286">Creating an s3 bucket</a>
   - <a href="https://youtu.be/yGYeYJpRWPM?si=wPWqvA8IISg5dH82&t=520">Creating IAM user / policy</a>

6. Create another `.env` file within the `server` directory:
   ```
   MONGO_URL="YourMongoDBUrl" # Mine is mongodb://localhost/BookNest
   ORIGIN="http://localhost:5173"
   PORT="3000"
   AWS_ACCESS_KEY="YourAccessKey"
   AWS_SECRET_KEY="YourSecretAccessKey"
   BUCKET_NAME="your-s3-bucket-name"
   BUCKET_REGION="your-region" # Mine is set to us-east-2
   ```

7. To view the project in the browser... Open the `client` directory and run:
   ```
   npm run dev
   ```

8. To begin the backend server... Open the `server` directory and run:
   ```
   npm start
   ```

9. Open your browser and navigate to: `http://localhost:5173`

## 🤝 Contributions

Contributions are welcome! If you have any suggestions or improvements, feel free to fork the repository, create a new branch, and submit a pull request.
