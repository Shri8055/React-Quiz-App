import { createRoot } from 'react-dom/client';
import React from 'react'; // Import React for React.createElement
import App from './App.jsx';

// Render the component using React.createElement
createRoot(document.getElementById('root')).render(
  React.createElement(App, null)
);
