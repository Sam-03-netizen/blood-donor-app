# 🩸 Community Blood Donor Finder

A simple React-based web application that helps users find blood donors based on blood group and city.

---

## 🚀 Features

- Fetch donor data from API
- Filter donors by blood group
- Search donors by city
- Request help from donors
- Request status persists using localStorage
- Loading and empty states handling
- Clean card-based UI

---

## 🛠️ Tech Stack

- React (useState, useEffect)
- JavaScript
- CSS
- JSONPlaceholder API

---

## 📡 API Used

https://jsonplaceholder.typicode.com/users

This API provides mock user data which is mapped into donor data in the application.

---

## ⚙️ How It Works

1. Fetches user data from API using `useEffect`
2. Converts users into donors by adding:
   - Blood group (random)
   - Availability (random)
3. Stores data using `useState`
4. Filters donors based on:
   - Selected blood group
   - Entered city
5. Displays donor cards dynamically using `map()`
6. Updates request status and stores it in `localStorage`

---

## 📂 Project Structure
