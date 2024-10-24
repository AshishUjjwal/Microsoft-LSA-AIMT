﻿# Microsoft LSA AIMT

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-MERN_Stack-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Deployed_on-Azure-blue?style=for-the-badge">
</p>

## Microsoft Learn Student Ambassadors - AIMT

The **Microsoft Learn Student Ambassadors AIMT Club** is an initiative led by students and coordinated by the community under the leadership of **Ashish Ujjwal**, the Club Lead. This club is an innovative and engaging community where students can participate in various technical and fun activities, including:

- **Organizing Events**
- **Running Technical Challenges**
- **Hosting Fun Activities**
  
The goal of this project is to create a full-featured web application that supports the coordination of the club's activities through an event panel, admin panel, blog panel, and more.


---

## ✨ **Project Features**

1. **Event Management Panel**  
   - Organize, create, and manage events for the club.
   - Track event details and participant lists.
   
2. **Admin Panel**  
   - Full control over the club’s activities.
   - Add/remove members, manage events, and oversee all club operations.

3. **Blog Panel**  
   - Post blogs and articles related to events, activities, and technical challenges.
   - CRUD functionality for blogs.

4. **User Authentication and Authorization**  
   - Uses **JWT** (JSON Web Token) for secure user authentication.
   - Role-based access control for admin, members, and general users.

5. **Fully Functional CRUD Application**  
   - Create, Read, Update, Delete operations are implemented across the platform.
   - Manage events, blogs, and user data efficiently.

6. **Real-time Communication**  
   - Integrated **Socket.io** for real-time messaging and notifications.

7. **Email Notifications**  
   - Integrated **Nodemailer** to send event and activity updates via email.

---

## 🚀 Deployed Website on Azure
The entire platform is deployed and hosted on Azure, ensuring fast and scalable performance.

**Live Website:** [Visit the platform](https://mango-forest-0ce50e110.5.azurestaticapps.net)

---

## 🎥 Project Video
Check out the project demonstration and walkthrough video:

**[Watch Project Video](#)**

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

## 💻 Local Setup

To run the project locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AshishUjjwal/Microsoft-LSA-AIMT.git
