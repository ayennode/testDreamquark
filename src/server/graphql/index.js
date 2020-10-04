import { ApolloServer, gql } from 'apollo-server-express'

import model from '../model'
import { Model } from 'mongoose'

const typeDefs = gql`
  type Job {
    _id: ID!
    name: String!
    weight: Int!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    job: Job
  }

  type Team {
    _id: ID!
    name: String!
    squadLeader: User
    squadMember1: User
    squadMember2: User
    intern: User
    brokenTeam: Boolean
  }

  type Query {
    users: [User!]!
    user(_id: ID!): User!
    leaders: [User!]
    usersWithoutLeader: [User!]
    jobs: [Job!]!
    jobAvailable(_id: ID): [Job]
    teams: [Team!]!
    team(_id: ID!): Team!
  }

  type Mutation {
    addUser(firstName: String, lastName: String, email: String): User
    deleteUser(_id: ID!): User
    addJob(name: String, weight: Int): Job
    updateUser(
      _id: ID!
      firstName: String
      lastName: String
      email: String
      job: ID
    ): User

    addTeam(
      name: String!
      squadLeader: ID!
      squadMember1: ID
      squadMember2: ID
      intern: ID
    ): Team
    deleteTeam(_id: ID!): Team
    updateTeam(
      _id: ID!
      name: String
      squadLeader: ID
      squadMember1: ID
      squadMember2: ID
      intern: ID
    ): Team
  }
`

//@TODO remove, debug only
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const resolvers = {
  Query: {
    users: async () => {
      await timeout(1000)
      return await model.User.find().populate('job')
    },

    user: async (parent, args, context, info) =>
      await model.User.findById(args._id).populate('job').exec(),

    jobs: async () => await model.Job.find(),

    jobAvailable: async (parent, args, context, info) => {
      if (!args._id) {
        return await model.Job.find().sort({ weight: 1 }).limit(1).exec()
      }
      const currentUser = await model.Job.findById(args._id).exec()
      const above = await model.Job.find({
        weight: { $gt: currentUser.weight },
      })
        .sort({ weight: 1 })
        .limit(1)
      const data = await model.Job.find({
        weight: { $lte: currentUser.weight },
      })
      return [...above, ...data]
    },

    teams: async () =>
      await model.Team.find()
        .populate({
          path: 'squadLeader',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .populate({
          path: 'squadMember1',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .populate({
          path: 'squadMember2',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .populate({
          path: 'intern',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        }),
    team: async (parent, args, context, info) =>
      await model.Team.findById(args._id)
        .populate({
          path: 'squadLeader',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .populate({
          path: 'squadMember1',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .populate({
          path: 'squadMember2',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .populate({
          path: 'intern',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .exec(),

    leaders: async () => {
      return await model.User.aggregate([
        {
          $lookup: {
            localField: 'job',
            from: 'jobs',
            foreignField: '_id',
            as: 'job',
          },
        },
        { $match: { 'job.name': 'squad leader' } },
        { $unwind: '$job' },
        {
          $lookup: {
            localField: '_id',
            from: 'teams',
            foreignField: 'squadLeader',
            as: 'teamLeader',
          },
        },
        { $match: { teamLeader: { $eq: [] } } },
      ])
    },

    usersWithoutLeader: async () => {
      return await model.User.aggregate([
        {
          $lookup: {
            localField: 'job',
            from: 'jobs',
            foreignField: '_id',
            as: 'job',
          },
        },
        { $match: { 'job.name': { $ne: 'squad leader' } } },
        {
          $unwind: {
            path: '$job',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
    },
  },
  Mutation: {
    addUser: async (root, args, context, info) => {
      const user = new model.User(args)
      return await user.save(args)
    },
    deleteUser: async (root, args, context, info) => {
      console.log('args', args)

      return await model.User.findByIdAndDelete(args._id)
    },

    addJob: async (root, args, context, info) => {
      const job = new model.Job(args)
      return await job.save(args)
    },
    /*
    updateUser: async (root, args, context, info) => {
      const save = await model.User.findByIdAndUpdate(args._id, args, {
        new: true,
      })
      return save.populate('job').execPopulate()
    },*/

    updateUser: async (root, args, context, info) => {
      const user = await model.User.findById(args._id).exec()
      Object.keys(args)
        .filter((f) => f != '_id')
        .map((key) => (user[key] = args[key]))
      await user.save()
      return user.populate('job').execPopulate()
    },

    addTeam: async (root, args, context, info) => {
      const team = new model.Team(args)
      const data = await team.save(args)
      return data
        .populate('squadLeader')
        .populate('squadMember1')
        .populate('squadMember2')
        .populate('intern')
        .execPopulate()
    },

    deleteTeam: async (root, args, context, info) => {
      console.log('args', args)

      return await model.Team.findByIdAndDelete(args._id)
    },

    updateTeam: async (root, args, context, info) => {
      args.brokenTeam = false
      const save = await model.Team.findByIdAndUpdate(args._id, args, {
        new: true,
      })
      return save
        .populate({
          path: 'squadLeader',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .populate({
          path: 'squadMember1',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .populate({
          path: 'squadMember2',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .populate({
          path: 'intern',
          model: 'User',
          populate: { path: 'job', model: 'Job' },
        })
        .execPopulate()
    },
  },
}

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
  },
})

export default schema
