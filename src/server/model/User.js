import mongoose from 'mongoose'
import Job from './Job'
import Team from './Team'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    //unique: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
})

userSchema.path('job').set(function (job) {
  console.log('inside setter', job, this.job)
  this._previousJob = this.job
  return job
})

userSchema.pre('save', async function (next) {
  console.log('this pre', this._previousJob)

  next()
})

userSchema.post('save', async function (user, next) {
  console.log('user', user)
  if (!!this._previousJob && this._previousJob != user.job) {
    const job = await Job.findById(this._previousJob)
    if (job.name == 'squad leader') {
      const teams = await Team.updateMany(
        { squadLeader: user._id },
        { brokenTeam: true, squadLeader: null }
      )
      console.log('TEAMS', teams)
    }
  }

  next()
})

const User = mongoose.model('User', userSchema)

export default User

/*
@TODO validator for email type + unique
findOneAndUpdate
*/
