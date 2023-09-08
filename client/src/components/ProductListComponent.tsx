import { useProductContext } from "../context/ProductContext";

function ProductList() {
  const { productList } = useProductContext();

  return (
    <div>
      <div>ProductList</div>
      <div className="productListContainer">
        {productList.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
