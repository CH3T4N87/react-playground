import { useGetProductsQuery } from "./redux/slices/productApiSlice"

const App = () => {
  const { data } = useGetProductsQuery();
  console.log(data);
  if(!data) return <div></div>
  return (
    <div>
      {
        data?.map(product =>  <div>
          <p>{product.title}</p>
          <p>{product.description}</p>
        </div>)
      }
    </div>
  )
}

export default App