import logo from './logo.svg';
import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Link, useParams , useNavigate , useLocation} from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <FruitList />,
  },
  {
    path: 'fruit/:id',
    element: <FruitDetail />,
  },
]);
const fruitList = [
  { title: "Potato", isFruit: false, id: 1 },
  { title: "Garlic", isFruit: false, id: 2 },
  { title: "Apple", isFruit: true, id: 3 },
];
function FruitList() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Fruit List</h1>
        <ul>
          {fruitList.map(fruit => (
            <li key={fruit.id}>
              {fruit.title+"\t"}
              <Link to={`/fruit/${fruit.id}`} style={{color: 'yellowgreen',fontSize:'12px'}}>
                Details
              </Link>
            </li>
          ))}
        </ul>
      </header>
    </div>

  );
}

function FruitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fruit = fruitList.find(p => p.id === parseInt(id));

  if (!fruit) {
    return <div>fruit not found</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Fruit Details</h1>
        <p>Id: {id}</p>
        <p>Title: {fruit.title}</p>
        <p>Is Fruit: {fruit.isFruit ? 'Yes' : 'No'}</p>
        <Link to={`/`} style={{color: 'yellowgreen',fontSize:'12px'}} onClick={() => navigate(location.state?.from || '/')}>
                Back To Home
              </Link>
             {location.state?.from && <p>Previous location: {location.state.from}</p>}
      </header>
    </div>

  );
};





function App() {
  return (
    <RouterProvider router={router} />
  );
};


export default App;





























/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>
          Edit <code>src/App.js</code> and save to reload.
        </h3>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
