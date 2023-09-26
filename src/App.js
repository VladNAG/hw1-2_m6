import { useEffect, useState } from 'react';
import './App.css';
import { render } from '@testing-library/react';

function App() {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch("http://localhost:5042/Product/", {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const product = { Id: id, Name: name, Price: price, Color: color };

    fetch("http://localhost:5042/Product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
    .then(() => {
      fetchProducts();
    })
  }
  const handelClick = () => {
    const product = { Id: id, Name: name, Price: price, Color: color };

    fetch("http://localhost:5042/Product", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
    .then(() => {
      fetchProducts();
    })
  }
  const handleDelete = (productId) => {
    fetch(`https://localhost:7020/Product?id=${productId}`, {
      method: "DELETE"
    })
    .then(() => {
      fetchProducts();
    })
  }
  const handleGet = (productId) => {
    fetch(`https://localhost:7020/Product/${productId}`, {
      method: "GET"
    }).then (response => {
      return response.json();
    })
    .then(product => {
      render (
          <div className='GET'>
            <h2> Car id-{product.id} </h2>
            <div><h4>Name: {product.name}</h4></div>
            <div><h4>Color: {product.color}</h4></div>
            <div><h4>Color: {product.color}</h4></div>
            <div><h4>Price: {product.price}</h4></div>
          </div>
    )
    })
  }


  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='Form'>
      <form onSubmit={handleSubmit} >
        <div>Id:<input type='text' value={id} onChange={(e) => { setId(e.target.value) }} /></div>
        <div>Name:<input type='text' value={name} onChange={(e) => { setName(e.target.value) }} /></div>
        <div>Price:<input type='text' value={price} onChange={(e) => { setPrice(e.target.value) }} /></div>
        <div>Color:<input type='text' value={color} onChange={(e) => { setColor(e.target.value) }} /></div>
        <button type="submit">Save</button>
        <button type="bottom" onClick={handelClick}> UpDate</button>
      </form>

      <br />
      <br />
      <h3>ALL CARS</h3>

      {products.length > 0 && 
      <>
        {products.map(product => (
          <div key={product.id}>
            <div>Id: {product.id}</div>
            <div>Name: {product.name}</div>
            <div>Color: {product.color}</div>
            <div>Price: {product.price}</div>
            <button type="button" onClick={() => handleDelete(product.id)}>Delete</button>
            <button type="button" onClick={() => handleGet(product.id)}>Info</button>
            <br />
            <br />
          </div>
        ))}
      </> }
    </div>
  );
}
export default App;

