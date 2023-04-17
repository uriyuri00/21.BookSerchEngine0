const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: string
        email: string
        password: string
        savedBooks:[Book]
    }
    type Book {
        _id: ID
        authors: [ string ]
        description: string
        bookId: string
        image: string
        link: string
        title: string
    }
    type Query{
        users: [User]
        user(_id: ID): User
        me: user
    }
    type Mutation{
        addUser(username: String, email: String, password: String): Auth
        login(email: String, password: String): Auth
        saveBook(bookId: String, author: [Sting], description: String, image: String, link: String): User
        removeBook(bookId: String): User
    }
`;

module.exports = typeDefs;