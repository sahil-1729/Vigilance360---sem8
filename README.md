<!-- # Vigilance 360

## Features

- **React 17**: The latest version of React for building user interfaces.
- **React Router**: For handling routing in your application.
- **Redux**: State management for predictable state changes.
- **Styled Components**: For writing CSS in JavaScript.
- **Jest**: Testing framework for unit and integration tests.
- **ESLint**: Linting tool to ensure code quality.
- **Prettier**: Code formatter to maintain consistent code style.
- **News API Integration**: Real-time crime news from around India.

## Getting Started

To get started with Vigilance 360, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/vigilance-360.git
   cd vigilance-360
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory with the following variables:
   
   ```
   NEWS_API_KEY=your_newsapi_org_key_here
   ```
   
   You can get a free API key from [News API](https://newsapi.org) by signing up for an account.

4. **Start the development server:**

   ```sh
   npm start
   ```

5. **Run tests:**
   ```sh
   npm test
   ```

## Folder Structure

```
vigilance-360/
├── public/
├── src/
│   ├── components/
│   ├── containers/
│   ├── redux/
│   ├── styles/
│   ├── utils/
│   ├── App.js
│   ├── index.js
│   └── serviceWorker.js
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```
