import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  squadLeader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  squadMember1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  squadMember2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  intern: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  brokenTeam: Boolean,
})

const Team = mongoose.model('Team', teamSchema)

export default Team
