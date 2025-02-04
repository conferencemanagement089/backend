const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: 'https://frontend-ht32.onrender.com/', // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If using authentication tokens or cookies
}));
app.options('*', cors());

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://conferencemanagement089:2qxneLB5wrsrOBVs@conference-management.gphbn.mongodb.net/?retryWrites=true&w=majority&appName=conference-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes
const authRoutes = require('./routes/auth');
const conferenceRoutes = require('./routes/conferences');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');
const reportRoutes = require('./routes/reports');
const registrationRoutes = require('./routes/registrations');
const sessionRoutes = require('./routes/sessions');
app.use('/api/auth', authRoutes);
app.use('/api/conferences', conferenceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/sessions', sessionRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
