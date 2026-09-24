import { useState } from 'react'
import useFetch from './useFetch'
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import './App.css'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <nav style={{display:"flex",gap:"10px", justifyContent:"space-between"}}> 
          <Link to="/">Products</Link>
          <Link to="/cart">cart</Link>
        </nav>


        
        <Routes>
            <Route path='/' element={<ProductList/>}/>
            <Route path='/cart' element={<ShoppingCart/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
