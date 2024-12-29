interface Signup{
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    username: string
}

interface Login {
    email: string,
    password: string,
}


export {Signup, Login}