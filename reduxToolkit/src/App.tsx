import AddProduct from "./components/AddProduct/AddProduct";
import { useGetProductsQuery, type Product } from "./redux/slices/productApiSlice"

const App = () => {
  const { data } = useGetProductsQuery();
  if(!data) return <div>No Data For Now</div>
  const products: Product[] = data.products;
  return (
    <div>
      <div>
        <AddProduct/>
      </div>
      {
        products.map(product =>  <div key={product.title}>
          <p style={{ backgroundColor: "lightcoral", color: "black" }}>{product.title}</p>
          <p>{product.description}</p>
        </div>)
      }
    </div>
  )
}

export default App