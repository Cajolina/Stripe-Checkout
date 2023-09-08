import Login from "./Login";
import ProductListComponent from "./ProductListComponent";

function Home() {
  return (
    <div>
      <Login />
      <h1>KOLSVART</h1>
      <h3>Products</h3>
      <ProductListComponent />
    </div>
  );
}

export default Home;
