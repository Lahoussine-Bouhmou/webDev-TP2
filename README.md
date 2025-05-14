# 💬 Chatroom Web App – JavaScript Integration

This is my solution for Assignment #2 in the Frontend Web Development course (2024/2025).  
In this assignment, we worked on integrating frontend and backend with JavaScript to create a real-time chatroom app.

## 🚀 How to Run the Project Locally

To get everything up and running, follow these steps:

### Backend Setup:
1. Navigate to the `backend/` folder.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm run start
   ```
4. The backend will run on [http://localhost:3014](http://localhost:3014).

### Frontend Setup:

1. Go to the `frontend/` folder.
2. Install the frontend dependencies:

   ```bash
   npm install
   ```
3. Start the frontend server:

   ```bash
   npm run start
   ```
4. Open the frontend on [http://localhost:8000/chatroom/index.html](http://localhost:8000/chatroom/index.html).

## 🔧 Features Implemented

* **Censoring Service**: When a user sends a message, it first gets censored if it contains restricted words (like "Lyon", "PSG", "English", etc.).
* **Send Messages**: Messages are sent via the `POST /message` API, after being censored.
* **Real-time Updates**: Regular polling from the server every 500ms to get new messages and update the chat window.
* **Error Handling**: Display error popups if the network request fails or if there's an issue with sending messages.
* **Clear Chat**: Ability to clear the entire chatroom via the `DELETE /chat` API.

## 🧑‍💻 Code Breakdown

* **`frontendChat.js`**: All the JavaScript logic lives here. It handles:

  * Censoring messages.
  * Sending messages to the backend.
  * Updating the chat window dynamically.
  * Polling the server for real-time chat updates.
* **`index.html`**: The frontend layout that links to the JS file. This page also features input fields for sending messages.
* **CSS**: Styling is handled through the linked `style.scss`.

### Key JavaScript Functions:

1. **Censoring**: Before sending a message, it checks with the backend’s `/censorMessage?message=<msg>` API to censor words.
2. **Message Sending**: If the message is valid, it's sent to the backend through the `/message` POST request.
3. **Real-time Updates**: Using `setInterval()` to request chat updates from the server every 500ms.
4. **Error Popups**: If there’s an issue with a request, an error popup will be shown with a "Close" button.

## 🛠️ Prerequisites

* **NodeJS**: Make sure Node.js is installed. If you've worked on Assignment #1, this should already be set up.

## 🧩 Project Structure

```
📁 backend/
  └── server files...
📁 frontend/
  ├── index.html
  ├── frontendChat.js
  ├── style.scss
  └── assets/
```

## 💡 Notes

* The **`fetch()`** function was used to make AJAX calls.
* The code uses **async/await** for better readability and handling of asynchronous operations.
* **Poll every 500ms**: The app regularly polls the server for chat updates, so you can see the latest messages in real-time.
* The **"Clear Chat"** button resets the chatroom content, thanks to the `DELETE /chat` API.
* Error handling is in place to handle network or server issues, with a user-friendly error message.

## 👥 Made by

* **Lahoussine Bouhmou**
