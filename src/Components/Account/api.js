const initialUsers = [
    {
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
        fullName: "Admin User"
    },
    {
        email: "user@gmail.com",
        password: "123456",
        role: "user",
        fullName: "Regular User"
    },
];

// Initialize users in localStorage if empty
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(initialUsers));
}

export default function fakeApi({ email, password }) {
    return new Promise((resolve, reject) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        setTimeout(() => {
            const user = users.find(
                (user) => user.email === email && user.password === password
            );

            if (user) {
                resolve({
                    token: `fake-jwt-token-${user.role}`,
                    role: user.role,
                    user: {
                        email: user.email,
                        fullName: user.fullName
                    }
                });
            } else {
                reject("Invalid email or password");
            }
        }, 1000);
    });
}

export const fakeRegister = ({ email, password, fullName }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.find((user) => user.email === email);

            if (userExists) {
                reject("Email already exists");
            } else {
                const newUser = {
                    email,
                    password,
                    fullName,
                    role: "user",
                };

                users.push(newUser);
                localStorage.setItem("users", JSON.stringify(users));

                resolve({
                    token: `fake-jwt-token-user`,
                    role: "user",
                    user: {
                        email,
                        fullName
                    }
                });
            }
        }, 1000);
    });
};