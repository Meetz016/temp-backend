const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User=require('./models/User')
const authRoutes = require('./routes/authRoutes');
const bcrypt=require('bcryptjs')
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const con=mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//populating mongodb 
seedUser = async () => {
  const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'editor', password: 'editor123', role: 'editor' },
    { username: 'user', password: 'user123', role: 'user' }
  ];

  for (let userData of users) {
    const existingUser = await User.findOne({ username: userData.username });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const user = new User({
        username: userData.username,
        password: hashedPassword,
        role: userData.role
      });

      await user.save();
    }
  }
};


if(con){
  console.log("mongo connection successful....")
  seedUser()
}



// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});