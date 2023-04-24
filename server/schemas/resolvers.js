const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../../../Savr/server/utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("books");
    },
    user: async (parent, args) => {
      const { _id, username } = args;
      return User.findOne().populate({ _id }).populate("books");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("books");
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
  Mutation: {
    saveBook: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      console.log(bookId);

      return await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
  },
  adduser: async (parent, { username, email, password }, context) => {
    const user = await User.create({ username, email, password });
    const token = signToken(user);

    return { token, user };
  },
  login: async (parent, { email, password }, context) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError("No user found with this email address");
    }
    const corretPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError("Incorrect credentials");
    }

    const token = signToken(user);

    return { token, user };
  },
};

module.exports = resolvers;
