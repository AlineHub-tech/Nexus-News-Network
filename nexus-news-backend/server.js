// server.js (Uburyo butunganije neza)

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const cors = require('cors'); 
const path = require('path'); // Dukeneye path kubika files
const fs = require('fs'); // ONGERAHO UYU MURONGO

// Tegura .env variables
dotenv.config();
// Huza na Database
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// SHYIRAMO IYI LOGIC YOSE HANO:
// Genzura no kurema folder ya 'uploads' niba idahari
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
}

// Gutanga serivise y'amafiles yibitse muri folder ya uploads
app.use('/uploads', express.static(uploadsDir)); // Wahindura path hano ugakoresha variable uploadsDir

// Import Routes
const publicRoutes = require('./routes/publicRoutes');
const writerRoutes = require('./routes/writerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes'); 

// Koresha Inzira (Routes)
app.use('/api/public', publicRoutes);
app.use('/api/writer', writerRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes); 

// ... (app.get('/') routes hano) ...

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
