# 📰 Nexus News Network (MERN Stack)

![Version](https://img.shields.io)
![License](https://img.shields.io)
![MERN](https://img.shields.io)
![Status](https://img.shields.io)

**Nexus News Network** is a high-performance, full-stack news publishing platform. It features a dynamic frontend for readers and a robust **Admin Dashboard** for managing articles, approvals, and advertisements. 

---

## 🚀 Live Demo
Experience the platform live here:  
👉 **[Nexus News Network Live Demo]
https://nexus-news-network.vercel.app/**
https://nexus-news-network-backend.onrender.com**

---

## 📸 Interface Preview
<img width="1344" height="617" alt="n3" src="https://github.com/user-attachments/assets/49fc6a4a-a3c1-4f89-ae5a-9d3d09f0376b" />
<img width="1349" height="617" alt="n2" src="https://github.com/user-attachments/assets/0530b07d-3605-45f8-ac90-74bc8d7b51a3" />
<img width="1349" height="623" alt="n1" src="https://github.com/user-attachments/assets/06439cbd-4c69-4314-aa2b-8e94ab24b924" />

---

## 🛠️ Technology Stack

### **Frontend**
*   **React.js** – UI components and state management.
*   **Context API** – Global state for pagination and news fetching.
*   **CSS3 (Modern Grid/Flex)** – Custom responsive design (8-card desktop layout).
*   **Axios** – HTTP client for API communication.

### **Backend**
*   **Node.js & Express** – Scalable server-side logic and RESTful APIs.
*   **MongoDB & Mongoose** – NoSQL database for flexible news schema.
*   **JWT (JSON Web Tokens)** – Secure Admin authentication.
*   **Cloudinary** – Cloud-based media storage for high-resolution images.
*   **Multer** – Middleware for handling multipart/form-data.

---

## ✨ Key Features

- 🖋️ **Advanced Article Management:** Create, Read, Update, and Delete (CRUD) news stories.
- ⚖️ **Moderation Workflow:** All articles start as `Pending` and require Admin approval before going live.
- 🎯 **Ad Management:** Dedicated system for uploading and placing banners/sliders across the site.
- 📱 **Fully Responsive:** Optimized for 8-article grids on Desktop, 2-column on Tablet, and single-column on Mobile.
- 📑 **Smart Pagination:** Efficiently handles large volumes of news for faster load times.
- 🔐 **Secure Admin Access:** Protected routes ensuring only authorized users can approve content.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd nexus-news-network

Server Configuration:
bash
cd server
npm install


Create a .env file in the server folder and add:
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret


Frontend Configuration:
bash
cd ../client
npm install
npm start


📈 Roadmap
Integration of User Comments.
Dark Mode support.
Social Media auto-sharing.
Search functionality (Search by Category/Date).
📄 License
Distributed under the MIT License. See LICENSE for more information.
👤 Author
Nexus News Team
GitHub: https://github.com/AlineHub
Portfolio: https://aline-site-seven.vercel.app/
ByteFlow Ltd: https://byte-flow-ltd.vercel.app/
Developed with ❤️ using the MERN Stack.



