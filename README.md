# Professional Portfolio Template

A modern, responsive, and easily configurable portfolio template built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Features

- **Modern UI/UX**: Sleek dark mode design with glassmorphism and subtle animations.
- **Fully Configurable**: All personal data, projects, and content are centralized in `src/data/portfolio.js`.
- **Responsive**: Optimized for all devices (Mobile, Tablet, Desktop).
- **Fast**: Built on Vite for lightning-fast development and building.

## 🛠️ Configuration

To customize this portfolio for yourself, you only need to edit **one file**:

👉 `src/data/portfolio.js`

### 1. Personal Information
Update the `PERSONAL_INFO` object with your details:
```javascript
export const PERSONAL_INFO = {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ...
    social: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername",
        // Add instagram, facebook etc. to enable them in the navbar
    },
};
```

### 2. Technology Stack
Update `TECHNOLOGIES` to reflect your skills. 
- **Icons**: The specific icons are mapped in `src/components/Technologies.jsx` using string keys (e.g., `"react"`, `"python"`, `"aws"`).
- **Level**: Adjust the mastery percentage.

### 3. Experience & Education
Update the `EXPERIENCE` and `EDUCATION` arrays with your history.

### 4. Projects
Update `PROJECTS` with your work. Place your project images in `src/assets/` and import them in `portfolio.js`.

### 5. Services
Update `SERVICES` to list what you offer. Use the following keys for icons:
- `"Globe"` (Web Dev)
- `"LineChart"` (Analytics)
- `"BrainCircuit"` (AI/ML)
- `"Database"` (Backend/Cloud)
- `"Presentation"` (Design)
- `"TrendingUp"` (Consulting)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Customization

- **Images**: Replace `profile.png`, `logo.png` in `src/assets/` with your own.
- **Colors**: The theme is defined in Tailwind classes. You can adjust the color scheme in `tailwind.config.js` or directly in the components.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
