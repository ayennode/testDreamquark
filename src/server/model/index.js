import mongoose from 'mongoose'
import User from './User'
import Job from './Job'
import Team from './Team'

const connectString =
  process.env.DATABASE_URL || 'mongodb://mongo:27017/dreamquark'

const connectDb = () => {
  return mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

const models = { User, Job, Team }

export { connectDb }
export default models
