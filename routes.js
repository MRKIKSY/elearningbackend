const express = require('express');
const router = express.Router();
const Job = require('./models'); // Ensure this path is correct

// GET all jobs
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Requested Job ID:', id);
  try {
    if (!id) {
      return res.status(400).json({ message: 'Job ID is required' });
    }
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// POST a new job
router.post('/', async (req, res) => {
  try {
    const newJob = new Job(req.body); // Create a new job with request body data
    const savedJob = await newJob.save(); // Save the job to the database
    res.status(201).json(savedJob); // Send created job as response
  } catch (error) {
    console.error('Error adding job:', error); // Log error
    res.status(500).json({ message: 'Internal Server Error' }); // Send error response
  }
});

// PUT to update a job by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return updated job and validate
    );
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' }); // Send 404 if job not found
    }
    res.json(updatedJob); // Send updated job as response
  } catch (error) {
    console.error('Error updating job:', error); // Log error
    res.status(500).json({ message: 'Internal Server Error' }); // Send error response
  }
});

// DELETE a job by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id); // Delete job by ID
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' }); // Send 404 if job not found
    }
    res.json({ message: 'Job deleted successfully' }); // Send success message
  } catch (error) {
    console.error('Error deleting job:', error); // Log error
    res.status(500).json({ message: 'Internal Server Error' }); // Send error response
  }
});

module.exports = router;
