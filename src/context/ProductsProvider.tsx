import { ReactElement, createContext, useEffect, useState } from "react";

export type ProductType = {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

// const initState: ProductType[] = [
//   {
//     id: "item0001",
//     title: "Widget",
//     price: 9.99,
//   },
//   {
//     id: "item0002",
//     title: "Premium Widget",
//     price: 19.99,
//   },
//   {
//     id: "item0003",
//     title: "Deluxe Widget",
//     price: 29.99,
//   },
// ];
const initState: ProductType[] = [];

export type UseProductsContextType = { products: ProductType[] };

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => {
          if (err instanceof Error) console.error(err);
        });

      return data;
    };

    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
