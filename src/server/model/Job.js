import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
})

const Job = mongoose.model('Job', jobSchema)

export default Job
