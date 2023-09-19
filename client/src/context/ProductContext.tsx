import {
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  createContext,
} from "react";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  default_price: string;
}

interface IProductContext {
  productList: IProduct[];
  getAllProducts: () => void;
}

const defaultValues = {
  productList: [],
  getAllProducts: () => Promise.resolve(),
};

const ProductContext = createContext<IProductContext>(defaultValues);

export const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({ children }: PropsWithChildren) => {
  const [productList, setProductList] = useState<IProduct[]>([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (!response.ok) {
        return console.log("Couldn´t fetch products");
      }
      setProductList(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProductContext.Provider value={{ productList, getAllProducts }}>
        {children}
      </ProductContext.Provider>
    </div>
  );
};

export default ProductProvider;
