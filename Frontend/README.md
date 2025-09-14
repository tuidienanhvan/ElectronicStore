# Gadget Heaven

**Gadget Heaven** is a modern e-commerce platform designed for tech enthusiasts to explore and purchase the latest gadgets and accessories. The platform offers an engaging shopping experience with features like dynamic product filtering, wishlist management, a shopping cart, and responsive design to ensure seamless usability across devices.

**Live link:** https://gadget_haven_bangladesh.surge.sh/

## Technologies Used
- **JavaScript (ES6+)**: For implementing application logic and interactivity.
- **React.js**: For building the dynamic and interactive user interface.
- **React Router**: For managing navigation and routing between pages.
- **Tailwind CSS**: For responsive and modern styling.
- **Context API**: For global state management.


## Key Features
**1. Wishlist Management**:
   - Users can add or remove products from their wishlist.
   - Wishlist items are displayed on a dedicated page.
   - Data is managed globally using the Context API.

**2. Shopping Cart**
   - Users can add products to their cart and view the total price.
   - Includes sorting functionality (e.g., sort by price in ascending or descending order).
   - Purchase button is disabled when the cart is empty.

**3. Dynamic Product Filtering**
   - Users can filter products by categories like smartphones, laptops, and tablets.
   - Real-time updates to the product list based on the selected category.

**4. Responsive Design**
   - Optimized for various screen sizes using Tailwind CSS.
   - Ensures a seamless user experience across mobile, tablet, and desktop devices.

**5. Error Handling**
   - A custom 404 error page with a "Back to Home" button for navigation.
   - Ensures users are guided back to the main page when they encounter an invalid route.



## React Fundamental Concepts Used

1. **Components:** Reusable UI components like Navbar, Footer, ProductListCard, etc.
2. **Props:** Passing data between components (e.g., ProductListCard receives product details as props).
3. **State:** Managing local component state using useState (e.g., modal visibility, sorting).
4. **Hooks:**
   - `useEffect`: For side effects like fetching data and syncing state 
   - `useContext`: For accessing global state via the Context API.
   - `useParams`: For accessing dynamic route parameters.

5. **Routing:** Implemented nested routes and dynamic routes using React Router.


## **Data Handling and Management**
- **Context API**: Used for managing global state, such as the shopping cart and wishlist.



## **ES6 Features Used**
1. **Arrow Functions**: Used for concise function expressions (e.g., `const handalSort = () => { ... }`).
2. **Template Literals**: Used for dynamic class names and JSX content (e.g., `className={\`text-lg \${isActive ? 'text-primary' : ''}\`}`).
3. **Destructuring**: Used to extract data from props and API responses (e.g., `const { product_id, product_title } = item`).
4. **Spread Operator**: Used for creating a copy of arrays (e.g., `const sorted = [...sortedItems].sort(...)`).



## How to Run the Project

Clone the repository:
   ```bash
      git clone git@github.com:jabirstain3/gadget_heaven.git
   ```

Navigate to the project directory:
   ```bash
      cd directory_name
   ```

Install dependencies:
   ```bash
      npm install
   ```

Start the development server:
   ```bash
      npm urn dev
   ```

Open the application in your browser at http://localhost:5173

 
**Enjoy exploring and shopping for the latest gadgets on Gadget Heaven!**