﻿<p align="center">
  <img src="https://img.shields.io/badge/Made_with-MERN_Stack-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Deployed_on-Azure-blue?style=for-the-badge">
</p>

## Microsoft Learn Student Ambassadors - AIMT

The **Microsoft Learn Student Ambassadors AIMT Club** is an initiative led by students and coordinated by the community under the leadership of **Ashish Ujjwal**, the Club Lead. This club is an innovative and engaging community where students can participate in various technical and fun activities, including:

- **Organizing Events**
- **Hosting Fun Activities**
- **Running Technical Challenges**
  
The goal of this project is to create a full-featured web application that supports the coordination of the club's activities through an event panel, admin panel, blog panel, and more.


---

## ✨ **Project Features**

### 1. 🛠️ Event Panel
Easily organize, manage, and participate in events. Users can browse, register, and get details on upcoming club events. 

### 2. 📝 Blog Panel
A fully CRUD-enabled blog panel where users and admins can create, read, update, and delete blogs. 

### 3. 📊 Admin Panel
Manage all users, events, and blogs from a centralized **Admin Panel**. Admins have complete control over the platform, including sending newsletters and moderating user activity.

### 4. 📬 Nodemailer Integration
Seamless email notifications via **Nodemailer**. Users get notified about event registration, blog updates, and other activities through emails.

### 5. 🔑 JWT Authentication & Authorization
Secure and reliable user authentication using **JSON Web Tokens (JWT)**. Roles and permissions are managed for users, admins, and event managers.

### 6. 🔴 Socket.io Real-time Communication
**Real-time communication** with **Socket.io** enables dynamic and engaging interaction among users during live events and chats.

---

## 🚀 Deployed Website on Azure
The entire platform is deployed and hosted on Azure, ensuring fast and scalable performance.

<!-- **Live Website:** [https://mango-forest-0ce50e110.5.azurestaticapps.net](https://mango-forest-0ce50e110.5.azurestaticapps.net) -->

---

## 🎥 Project Video
Check out the project demonstration and walkthrough video:

<!-- **[https://mango-forest-0ce50e110.5.azurestaticapps.net](https://mango-forest-0ce50e110.5.azurestaticapps.net)** -->

---

## 🔧 Technologies Used

This project is built on the **MERN Stack** with additional features for email services and real-time interaction.

- **Frontend:** React.js (with Chakra UI for beautiful, responsive design)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (fully CRUD-enabled)
- **Authentication:** JWT (JSON Web Token)
- **Email Service:** Nodemailer
- **Real-time Communication:** Socket.io
- **Hosting & Deployment:** Azure Static Web Apps, Azure App Service

---

## 📑 Database Structure (MongoDB)
1. **Users Collection**:  
   Stores user information, including roles (admin, user), authentication tokens, and profile data.
   
2. **Events Collection**:  
   Stores all event-related data including event details, registered users, and event organizers.
   
3. **Blogs Collection**:  
   A collection of all user-created blogs, along with timestamps, categories, and authorship details.

---

## 🔐 Authentication & Authorization

    This project uses JWT for user authentication and role-based authorization. The following user roles are supported:

    1. Admin:
    Full access to all resources including events, users, and blogs.

    2. Event Manager:
    Limited access to manage events and moderate related user activities.

    3. User:
    Can register for events, read blogs, and contribute by writing blog posts.

---

## 📬 Nodemailer Setup
To set up email notifications, the Nodemailer service is integrated. You can configure the sender email in the .env file as shown in the Local Setup section.

---

## 📊 Admin Dashboard
The Admin Panel allows you to:

* View and manage all users
* Moderate events and blogs
* Send newsletters to the community
* Track user activity logs

---

## 🔴 Real-Time Interaction with Socket.io
This project includes a real-time chat feature using Socket.io. Users can interact during events, post live comments, and participate in real-time discussions.

---

## 📈 Future Enhancements
In future versions, we aim to add more features such as:

* User Notifications: Push notifications for event updates, blog posts, and other announcements.
* Event Analytics: Detailed reports on event participation and user engagement.
* Advanced Admin Controls: Enhanced moderation features and automated reports.

---

## 💻 Local Setup

To run the project locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AshishUjjwal/Microsoft-LSA-AIMT.git


2. **Navigate to the Project Directory**
    ```bash
    cd Microsoft-LSA-AIMT
    
3. **Install Dependencies**
    ```bash
    npm install
    cd client
    npm install

4. **Set up Environment Variables**

    Create a .env file in the root directory and add the following variables:

    ```bash
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password

5. **Run the Application**
    To run the server and client:
    ```bash
    npm run dev

6. **Access the Application**
    Open your browser and go to http://localhost:3000.

---

## 🏆 Achievements
This project has been a significant part of the Microsoft Learn Student Ambassadors program. It's designed to foster community building and collaboration among students and professionals alike.

---

## 👨‍💻 Project Maintainer: 
### Ashish Ujjwal - Club Lead & Project Maintainer
Feel free to reach out on : 
- **GitHub :** [https://github.com/AshishUjjwal](https://github.com/AshishUjjwal)
- **LinkedIn :** [https://www.linkedin.com/in/ashish-ujjwal-a9bb03228/](https://www.linkedin.com/in/ashish-ujjwal-a9bb03228/)

---

## 🤝🏗 Contributing
We welcome contributions from the community! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature-name).
3. Commit your changes (git commit -m 'Add a new feature').
4. Push to the branch (git push origin feature/your-feature-name).
5. Open a Pull Request.

For more details, please read the Contributing Guidelines.

----

## 📄🏅 License
    This project is licensed under the MIT License - see the LICENSE file for details.

