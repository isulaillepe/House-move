# 🏠 House-Move

A responsive Single Page Application (SPA) for browsing and saving real estate properties. This project demonstrates modern React development practices, including dynamic routing, state management, and component-based architecture.

**🔴 Live Demo:** [https://isulaillepe.github.io/House-move](https://isulaillepe.github.io/House-move)

## ✨ Key Features
* **Property Search:** Filter properties by location and type (House/Flat).
* **Dynamic Routing:** Individual detail pages for every property using React Router v6.
* **Favorites System:** Add, remove, and clear properties from a personalized sidebar.
* **Interactive UI:** Tabbed interfaces for property descriptions and drag-and-drop elements.
* **Responsive Design:** Optimized for various screen sizes.

## 🛠️ Tech Stack
* **Core:** React.js (v18)
* **Build Tool:** Vite
* **Routing:** React Router DOM
* **Styling:** CSS3 (Flexbox & Grid)
* **Deployment:** GitHub Pages

## 🚀 How to Run Locally
1.  Clone the repository:
    ```bash
    git clone [https://github.com/isulaillepe/House-move.git](https://github.com/isulaillepe/House-move.git)
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev

## 📂 System BluePrint

A look at how the application logic is compartmentalized:

```bash
src/
├── 🧩 components/      # Lego blocks (PropertyCard, SearchWidget, DropZone)
├── ⚡ context/         # The brain (Global State & Reducers)
├── 💾 data/            # Static JSON feed (Property Mock Data)
├── 📄 pages/           # Route Views (SearchPage, PropertyDetails)
├── 🎨 index.css        # The skin (CSS Variables & Media Queries)
└── 🛠️ utils.js         # Helper logic (Currency formatters, Date parsers)
    ```
