# Ecommerce React App

A complete ecommerce web application built using **React**, **React Router**, **Tailwind CSS**, and **advanced React concepts**. The project simulates a real commercial shopping experience where users can explore products, buy items, manage their favorites, and control their own account data — all powered by a **custom fake API** and product data from **dummyjson**.

---

## ✨ Main Features

### 🛍 Products & Shopping

- Browse and search products by category or keyword.
- View detailed product information (images, price, rating, description).
- Add/remove products from **Cart**.
- Increase or decrease product **quantity** in Cart.
- Complete a **fake checkout process**, receive an **order invoice**, and return back to Home screen.

### ❤️ Favorites

- Add or remove products from the **Favorites (Wishlist)**.
- Favorites are saved per user using local fake API.

### 👤 User System

- Create new account and **login/logout** using a mocked API.
- Each user has their own **favorites**, **cart data**, and **order history**.
- Ability to **change profile password** from settings page.
- After login, the user can see:
  - Previous orders
  - Saved favorites
  - Cart products

### 📦 Tech Stack

| Technology      | Description                        |
| --------------- | ---------------------------------- |
| React           | Front-end framework                |
| React Router    | Routing between pages              |
| Tailwind CSS    | Styling and responsive layout      |
| JavaScript      | Application logic                  |
| DummyJSON API   | Products data                      |
| Custom Fake API | User data, cart, favorites, orders |

---

## 📁 Project Structure (simplified)

```
src/
┣ Components/
┃ ┣ Account/ (login, register, forget password)
┃ ┣ header/
┃ ┣ sideProducts/
┃ ┗ shared components
┣ Containers/
┃ ┣ Home.jsx
┃ ┣ Cart.jsx
┃ ┣ Favorites.jsx
┃ ┣ OrderSuccess.jsx
┃ ┣ userAccount.jsx
┃ ┣ ProductDetails.jsx
┗ App.jsx & main.jsx
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/Abdallah-Mushtaha/Ecommerce
npm install
npm run dev
```
