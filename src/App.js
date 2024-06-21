import "./App.css";
import { useEffect, useState } from "react";
import Products from "./components/Products";

function App() {
  const [products, setProducts] = useState([]);

  async function getData() {
    const data = await fetch(
      "https://fake-store-api.mock.beeceptor.com/api/products"
    );
    const response = await data.json();

    setProducts(response);

    console.log(response);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Products</h1>

      {products.map((value) => (
        <Products
          category={value.category}
          description={value.description}
          brand={value.brand}
          image={value.image}
          name={value.name}
          key={value.product_id}
          rating={value.rating}
          price={value.price}
        />
      ))}
    </div>
  );
}

export default App;
