import { observer } from 'mobx-react-lite';
import carStore from "../stores/CarStores";

function ProductList() {
    function handleAddProduct(e){
        e.preventDefault(); 
        const product={
            title:e.target.title.value,
            description:e.target.description.value,
            image:e.target.image.value,
            price:e.target.price.value,
        }
        carStore.addProduct(product)
    }
    function handleEditProduct(productId){
        const price = prompt("Enter new Price");

        if(!price) return;
        carStore.updatedProduct(productId,price);
    }
    return (
        <>
            <h1>PRODUCT LIST</h1>
             <h2>Product in Cart: <span style={{color:"red"}}>{carStore.cart.length}</span></h2>
            <section style={{ display: "flex", gap: "10px" ,flexWrap:"wrap", width:"100%"}}>

                {carStore.isLoading && <p>Loading...</p>}
                {carStore.error && <p>{carStore.error}</p>}

                {carStore.products.map((product) => (

                    <div key={product.id} style={{width:"300px", border: "1px solid black", alignItems: "center", backgroundColor: carStore.isInCart(product.id)? "green":"yellow" }}>
                        <img src={product.image} style={{width:"300px",height:"300px"}}></img>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <h3>${product.price}</h3>
                        {
                            carStore.isInCart(product.id) ? <button disabled>Added</button> :
                                <button onClick={() => carStore.addToCart(product)}>Add To Cart</button>
                        }
                        <button onClick={()=>carStore.deleteProduct(product.id)}>Delete</button>
                        <button onClick={()=>handleEditProduct(product.id)}>Edit Price</button>
                    </div>
                ))}
            </section>
            <section className='addProducts'>
                <h2>Add Product</h2>
                <form onSubmit={handleAddProduct}>
                    <label >Product Title </label>
                    <input name="title"/>
                    <br/>
                    <br/>
                    <label>Product Price </label>
                    <input name="price"  type="number"/>
                    <br/>
                    <br/>
                    <label>Product Image Link </label>
                    <input name="image"/>
                    <br/>
                    <br/>
                    <label >Product Image Description </label>
                    <textarea name="description"/>
                    <br/>
                    <br/>
                    <button type="submit">
                        submit
                    </button>
                </form>
            </section>

           

        </>
    )
}

export default observer(ProductList);