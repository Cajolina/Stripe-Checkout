import { useCartContext } from "../context/CartContext";
import { useProductContext } from "../context/ProductContext";

function ProductList() {
  const { productList } = useProductContext();
  const { addToCart } = useCartContext();
  return (
    <div>
      <h2>Products</h2>

      <div className="productListContainer">
        {productList.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <img className="productImg" src={product.image} alt="" />
            <p>{product.price / 100} </p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
