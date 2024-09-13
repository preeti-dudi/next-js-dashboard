# Next.js Dashboard Project

This is a Next.js dashboard project, set up with modern tools and technologies like Tailwind CSS, TypeScript, and more. It also integrates authentication and PostgreSQL for database handling.

## 🗂️ Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [DevDependencies](#devdependencies)
- [Environment Variables](#environment-variables)
- [License](#license)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: `>=20.12.0`
- **npm**: `>=9.8.1`

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/preeti-dudi/next-js-dashboard.git
   cd next-js-dashboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the project.

### Production Build

To build the project for production:

```bash
npm run build
```

This will create an optimized production build in the `.next` directory.

## 📜 Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run start`**: Start the production server.
- **`npm run lint`**: Run ESLint to lint your code.

## 📦 Dependencies

- **[`@heroicons/react`](https://github.com/tailwindlabs/heroicons)**: Heroicons for React.
- **[`@tailwindcss/forms`](https://github.com/tailwindlabs/tailwindcss-forms)**: Tailwind CSS plugin for styling forms.
- **[`@vercel/postgres`](https://github.com/vercel/postgres)**: PostgreSQL integration for Vercel.
- **[`autoprefixer`](https://github.com/postcss/autoprefixer)**: A PostCSS plugin to add vendor prefixes to CSS.
- **[`bcrypt`](https://github.com/kelektiv/node.bcrypt.js)**: A library to hash passwords.
- **[`clsx`](https://github.com/lukeed/clsx)**: A utility for constructing `className` strings conditionally.
- **[`next`](https://github.com/vercel/next.js)**: The React framework for production.
- **[`next-auth`](https://github.com/nextauthjs/next-auth)**: Authentication solution for Next.js.
- **[`postcss`](https://github.com/postcss/postcss)**: A tool for transforming CSS with JavaScript plugins.
- **[`react`](https://github.com/facebook/react)**: A JavaScript library for building user interfaces.
- **[`react-dom`](https://github.com/facebook/react)**: React package for working with the DOM.
- **[`tailwindcss`](https://github.com/tailwindlabs/tailwindcss)**: A utility-first CSS framework.
- **[`typescript`](https://github.com/microsoft/TypeScript)**: TypeScript language support.
- **[`use-debounce`](https://github.com/xnimorz/use-debounce)**: A React hook for debouncing values.
- **[`zod`](https://github.com/colinhacks/zod)**: A TypeScript-first schema declaration and validation library.

## 🛠️ DevDependencies

- **[`@types/bcrypt`](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/bcrypt)**: TypeScript definitions for bcrypt.
- **[`@types/node`](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node)**: TypeScript definitions for Node.js.
- **[`@types/react`](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)**: TypeScript definitions for React.
- **[`@types/react-dom`](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom)**: TypeScript definitions for React DOM.
- **[`eslint`](https://github.com/eslint/eslint)**: A pluggable JavaScript linter.
- **[`eslint-config-next`](https://github.com/vercel/next.js/tree/canary/packages/eslint-config-next)**: ESLint configuration for Next.js.

## 🌐 Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables:

```env
DATABASE_URL=your_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This `README.md` file is now formatted with GitHub-specific markdown and includes links to relevant resources. You can replace `<your-repository-url>` and `<your-project-directory>` with your actual repository URL and project directory name.