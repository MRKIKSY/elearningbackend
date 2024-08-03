const mongoose = require('mongoose');
const Job = require('./models'); // Import the Job model
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Database connected successfully');

    // Define sample job data
    const jobs = [
      {
        type: 'Full-Time',
        title: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        description: 'We are looking for a highly skilled Senior Software Engineer to join our development team...',
        salary: 120000,
        company: {
          name: 'Tech Innovations Inc.',
          description: 'A leading company in tech innovation specializing in software development and IT solutions.',
          contactEmail: 'contact@techinnovations.com',
          contactPhone: '+1-415-555-1234'
        }
      },
      // Add more sample jobs here
    ];

    // Insert sample jobs
    await Job.insertMany(jobs);
    console.log('Sample jobs inserted');
    
    // Close the database connection
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
