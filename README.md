# 📊 Data Visualization Dashboard (Blackcoffer Assignment)

A fully responsive, modern Data Visualization Dashboard built using the **MERN** stack (MongoDB, Express.js, React, Node.js) with **Chart.js** (`react-chartjs-2`). It consumes data from the provided JSON dataset and visualizes it across multiple fields using rich, interactive charts, customizable filters, and dynamic dark/light mode themes.

---

## 🛠️ Tech Stack & Libraries Used

### **Frontend (Vite + React)**
*   **Vite** - Rapid development build tool.
*   **React (v19)** - Frontend component library.
*   **Chart.js** & **React-Chartjs-2** - For plotting interactive charts.
*   **Axios** - For making asynchronous HTTP requests to the backend.
*   **React Router DOM** - Router integration.
*   **CSS (Vanilla)** - Curated CSS styling with a sleek responsive layout, grid systems, custom loaders, and transition effects.
*   **Lucide Icons** - Clean icons for the sidebar, header, and KPI cards.

### **Backend (Express.js + Node.js)**
*   **Node.js** - Server runtime environment.
*   **Express.js** - Light-weight web framework for building API endpoints.
*   **MongoDB Atlas & Mongoose** - Document database and Object Data Modeling (ODM) library for MongoDB.
*   **Cors** - For handling Cross-Origin Resource Sharing.
*   **Dotenv** - For managing environment variables.
*   **Nodemon** - Live reloader for fast development.

---

## 📂 Project Structure

```text
Blackcoffer_assignment/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── chartController.js     # Chart aggregation endpoints
│   │   ├── dashboardContrller.js  # Dashboard overview stats
│   │   ├── dataController.js      # Main data endpoint (search/pagination/filters)
│   │   └── filterController.js    # Endpoint to query clean, distinct filters
│   ├── models/
│   │   └── data.js                # Mongoose schema mapping
│   ├── routers/
│   │   ├── chartRoutes.js         # /api/charts routes
│   │   └── dataRoutes.js          # /api/data, /filters, /dashboard routes
│   ├── scripts/
│   │   └── importData.js          # Script to import jsondata.json to Atlas
│   ├── utils/
│   │   └── aggregation.js         # Mongo Aggregation Pipeline helper functions
│   ├── jsondata.json              # Primary source data file (input data)
│   ├── server.js                  # Express server entry point
│   ├── package.json               # Backend dependencies and scripts
│   └── .env                       # Environment configuration
│
└── frontend/
    ├── public/                    # Static assets
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx        # Navigation bar
    │   │   ├── Header.jsx         # Top navigation, search, and theme switcher
    │   │   ├── KpiCards.jsx       # Quick aggregate metric cards
    │   │   ├── FilterPanel.jsx    # Group of dropdown selectors
    │   │   ├── DashboardCharts.jsx# Container rendering all charts
    │   │   └── DataTable.jsx      # Clean paginated grid of all insights
    │   ├── services/
    │   │   └── api.js             # Centralized Axios API request client
    │   ├── App.jsx                # App orchestrator (State, Tabs, Theme)
    │   ├── App.css                # Global components styling
    │   ├── index.css              # Baseline resets and utility classes
    │   └── main.jsx               # React client root entry
    ├── package.json               # Frontend dependencies and scripts
    └── vite.config.js             # Vite configurations
```

---

## 📈 Charts Implemented (Chart.js)

The dashboard presents **8 visual layouts** inside the `DashboardCharts` component, matching standard data visualization metrics:

1.  **Topic vs Intensity (Vertical Bar Chart)**:
    *   **Description**: Visualizes the top 15 topics based on their average Intensity values.
    *   **Data Fields**: `topic`, `intensity`.
2.  **Sector Distribution (Doughnut Chart)**:
    *   **Description**: Visualizes the relative insight share of the top 8 sectors.
    *   **Data Fields**: `sector`.
3.  **Year vs Likelihood (Area / Line Chart)**:
    *   **Description**: Line chart with smooth tension curves and area fills tracking average Likelihood over time (End Year).
    *   **Data Fields**: `end_year`, `likelihood`.
4.  **Relevance over Years (Area / Line Chart)**:
    *   **Description**: Line chart tracking the average Relevance rating across active End Years.
    *   **Data Fields**: `end_year`, `relevance`.
5.  **Country Distribution (Horizontal Bar Chart)**:
    *   **Description**: Horizontal bar chart comparing data volume (insight count) across the top 10 countries.
    *   **Data Fields**: `country`.
6.  **Intensity vs Likelihood (Scatter Chart)**:
    *   **Description**: Plots individual raw datapoints showing the correlation between Intensity (X-Axis) and Likelihood (Y-Axis).
    *   **Data Fields**: `intensity`, `likelihood`.
7.  **Sector Metrics Radar Chart (with Auto-Fallback)**:
    *   **Description**: Compares Intensity, Likelihood, and Relevance on a web grid for the top 7 sectors.
    *   **Dynamic Design**: Automatically converts into a multi-series Bar Chart if user-applied filters narrow the available sectors down to fewer than 3 (radar plots require a minimum of 3 points).
    *   **Data Fields**: `sector`, `intensity`, `likelihood`, `relevance`.
8.  **PEST Distribution (Polar Area Chart)**:
    *   **Description**: Displays the breakdown count for the top 6 PESTLE (Political, Economic, Social, Technological, Legal, Environmental) categories.
    *   **Data Fields**: `pestle`.

---

## ⚙️ Features

*   **Interactive Multi-Filters**: Fully interactive filter bar to slice and dice dashboard visualizations instantly. Supports filtering by:
    *   *End Year, Topic, Sector, Region, PESTLE, Source, Country, City, SWOT, Start Year*.
*   **Global Full-Text Search**: Includes a real-time **debounced search bar** querying titles, insights, regions, sources, topics, and sectors.
*   **KPI Quick Stats**: Metrics dashboard displaying counts of:
    *   *Total Insights, Countries, Topics, Sectors, and Regions*.
*   **Comprehensive Data Table**: An active page view listing all insights with backend pagination (20 items/page default), dynamic limits, and sorting by column header attributes.
*   **Theme Toggle**: Dark/Light mode color palettes. The UI transitions colors smoothly, adhering to system presets or stored values in `localStorage`.

---

## ⚙️ Detailed Installation & Running Guide

Ensure you have **Node.js** and **npm** installed on your system.

### **1. Clone & Navigate to project**
```bash
git clone <repository-url>
cd Blackcoffer_assignment
```

---

### **2. Backend Setup**

1.  Navigate into the `backend` folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables. Open `.env` (or create it if not present) and add:
    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://blackcoffer:rohankumar@cluster0.mh3pdc2.mongodb.net/?appName=Cluster0
    ```
    *(Note: You can replace the MONGO_URI with your local Mongo instance `mongodb://localhost:27017/blackcoffer` or standard Atlas connection string)*

4.  **Import the Dataset into MongoDB:**
    Before launching the servers, run the utility import script to seed the database with items from `jsondata.json`:
    ```bash
    npm run import
    ```
    *This will connect to your MongoDB database, delete any old collection data, and insert the JSON records.*

5.  Start the backend development server:
    ```bash
    npm run dev
    ```
    The API server should boot up at: `http://localhost:5000`

---

### **3. Frontend Setup**

1.  Open a new terminal session and navigate into the `frontend` folder:
    ```bash
    cd ../frontend
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite local development server:
    ```bash
    npm run dev
    ```
4.  Open the application in your browser at:
    `http://localhost:5173` (or the port specified by Vite in the terminal output).

---

## 📡 API Reference endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/dashboard` | Returns summary numbers (e.g. counts of unique sectors, countries, topics, regions). |
| **GET** | `/api/filters` | Dynamically extracts distinct, non-empty, sorted values for dropdown selectors. |
| **GET** | `/api/data` | Retrieves the list of insights with support for `?page=`, `?limit=`, `?sort=`, `?search=` and filter params. |
| **GET** | `/api/charts/:field` | Aggregates and returns metrics (average intensity, likelihood, relevance, and overall count) grouped by the specified field parameter (e.g. `topic`, `country`, `sector`, etc.). |
