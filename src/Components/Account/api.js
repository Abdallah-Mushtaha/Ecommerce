// fakeAPI.js

export async function fakeRegister({ email, password }) {
    return new Promise((resolve, reject) => {
        const fakeDB = JSON.parse(localStorage.getItem("users")) || [];

        const exists = fakeDB.find((user) => user.email === email);
        if (exists) {
            return reject("Email already exists");
        }

        const newUser = { email, password };
        fakeDB.push(newUser);
        localStorage.setItem("users", JSON.stringify(fakeDB));

        const token = btoa(JSON.stringify({ email }));
        resolve({ token, user: newUser });
    });
}

export default async function fakeApi({ email, password }) {
    return new Promise((resolve, reject) => {
        const fakeDB = JSON.parse(localStorage.getItem("users")) || [];

        const user = fakeDB.find(
            (user) => user.email === email && user.password === password
        );
        if (!user) {
            return reject("Invalid email or password");
        }

        const token = btoa(JSON.stringify({ email }));
        resolve({ token, user });
    });
}

export function fakeVerifyToken(token) {
    try {
        const data = JSON.parse(atob(token));
        return data?.email ? data : null;
    } catch (err) {
        console.log("Token verification failed:", err);
        return null;
    }
}

export function fakeUpdatePassword(email, newPassword) {
    const fakeDB = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = fakeDB.findIndex((user) => user.email === email);
    if (userIndex === -1) return false;

    fakeDB[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(fakeDB));
    return true;
}
