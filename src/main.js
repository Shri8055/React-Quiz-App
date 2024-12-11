const { createRoot } = ReactDOM;
const App = () => React.createElement('div', null, 'Hello, World!');

createRoot(document.getElementById('root')).render(
  React.createElement(App, null)
);
