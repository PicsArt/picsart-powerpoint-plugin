
# 🚀 PowerPoint Plugin - **Image Enhancer Pro** 🎨

A PowerPoint plugin that allows you to enhance your presentations by uploading images, removing backgrounds, and enhancing images with strokes, shadows, or upscale factors. Additionally, you can generate images based on context.

---

## 📌 Features

1. **Upload File**: Upload images to enhance or process.
2. **Remove Background**: Remove backgrounds from images with precision.
3. **Enhance with Stroke and Shadow**: Add strokes and shadows to images.
4. **Image Upscaling**: Upscale your image by factors of 2x, 4x, 6x, or 8x.
5. **Image Generation**: Generate images based on a given context.

---

## 🚀 Quick Start Guide

### Prerequisites

Ensure the following are installed:

- **Node.js**: Version 14.0.0 or higher
- **npm**: Version 6.0.0 or higher
- **PowerPoint**: Microsoft PowerPoint desktop app with add-in support

---

### Installation and Running

1. **Clone the Repository**

   ```bash
   git clone [your-repo-url]
   cd [your-repo-directory]
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Plugin**

   ```bash
   npm start
   ```

   PowerPoint will automatically open, and the plugin will be loaded in the **Taskpane**.

---

## 📂 Project Structure

The project is structured as follows:

```
POWERPOINT-PLUGIN/
├── .vscode/              # VSCode settings
├── assets/               # Static assets
├── dist/                 # Bundled build files
├── node_modules/         # Installed npm dependencies
├── src/                  # Source files
│   ├── commands/         # Command logic for the plugin
│   ├── constants/        # Constants for messages, URLs, etc.
│   │   ├── errorMessages.ts
│   │   ├── messages.ts
│   │   └── url.ts
│   ├── styles/           # Styling (SCSS)
│   │   ├── _colors.scss
│   │   ├── _variables.scss
│   │   └── global.scss
│   ├── taskpane/         # Taskpane components and logic
│   │   ├── components/
│   │   │   ├── modals/
│   │   │   └── ui/
│   │   ├── pages/        # Pages for each feature
│   │   │   ├── Body/
│   │   │   ├── Enhance/
│   │   │   ├── GenerateImages/
│   │   │   ├── IntroPage.tsx
│   │   │   └── RemoveBg/
│   │   ├── App.tsx       # Main entry point for Taskpane UI
│   │   ├── index.tsx     # Index file for the Taskpane
│   │   └── taskpane.html # HTML for the Taskpane
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions and helpers
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore file
├── .hintrc               # Linting configuration
├── babel.config.json     # Babel configuration
├── manifest.xml          # Manifest file for the PowerPoint plugin
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Dependency lock file
└── README.md             # Project documentation
```

---

## ✨ How to Use

1. **Open PowerPoint**  
   After running `npm start`, PowerPoint will launch automatically.

2. **Navigate to Taskpane**  
   The plugin will load in the Taskpane. You can interact with the following features:
   - Upload images to process
   - Remove backgrounds or enhance images with strokes/shadows
   - Upscale images to desired resolutions
   - Generate images based on textual context

---

## 🧪 Testing the Features

To test the functionality:

- Upload an image via the Taskpane.
- Choose a feature (e.g., Remove Background, Upscale, Enhance).
- Follow the prompts in the Taskpane to process the image.

---

## 🤝 Contribution Guidelines

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push your changes (`git push origin feature/your-feature`).
5. Open a pull request for review.

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 📷 Project Structure Screenshot

Below is the project structure for reference:

![Project Structure](./proejctstrucutre.png)

---

## 🌟 Acknowledgments

- Microsoft Office Add-in Documentation
- React and TypeScript for modern UI development
