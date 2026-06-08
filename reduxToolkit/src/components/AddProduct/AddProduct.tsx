import { useForm } from "react-hook-form";
import { useAddProductMutation, type Product } from "../../redux/slices/productApiSlice"; 

const AddProduct = () => {
  const { register, handleSubmit } = useForm<Product>();
    const [ addProduct ] = useAddProductMutation();
  const onSubmit = async (data: Product) => {
    try{
        const response = await addProduct(data).unwrap();
        console.log("added successfully !!", response);
    }catch(e) {
        console.log("failded adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="title" {...register("title")} />
      <input type="text" placeholder="description" {...register("description")} />
      <button type="submit">add product</button>
    </form>
  );
};

export default AddProduct;
