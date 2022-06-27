import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "ahmed sherif",
        email: "ahmed@gmail.com",
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: "JOhn doe",
        email: "JOhn@gmail.com",
        password: bcrypt.hashSync('123456', 10),

    }
]

export default users