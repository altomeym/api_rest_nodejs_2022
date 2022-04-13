const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: true
        },
        passwor: {
            type: String,
        },
        role: {
            type: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true,    // TODD createdAt, updatedAt
        versionKey: false
    }
)

module.exports = mongoose.model('users', UserScheme)