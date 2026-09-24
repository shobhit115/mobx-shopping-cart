import { observer } from 'mobx-react-lite';
import carStore from "../stores/CarStores";

function ShoppingCart() {
    return (
        <>
            <h1>SHOPPING CART</h1>
            {(carStore.cart.length == 0) ? <h3>No Added Product</h3> : (
                <section className='cartItems' style={{display:"grid", gap:"10px"}}>

                    {carStore.cart.map((product) => (
                        <div key={product.id} style={{ display: "flex", gap: "10px",width:"100%",justifyContent:"space-between" }}>
                            <div style={{ display: "flex", gap: "10px",width:"70%",justifyContent:"space-between" }}>

                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                            </div>
                            <div style={{ display: "flex", gap: "10px",width:"10%",justifyContent:"space-between" }}>

                            <button onClick={() => carStore.addToCart(product)}>+</button>
                            <p>{product.quantity}</p>
                            <button onClick={() => carStore.decreaseQuantity(product)}>-</button>
                            </div>
                        </div>
                    )
                    )}
                    <button onClick={() => carStore.clearCart()}>Clear Cart</button>
                </section>
            )}

            <h2>Total Items:{carStore.totalItems}</h2>
            <h2>Total Items Prize: ${carStore.subTotal}</h2>
            <h2>Discount: ${carStore.discount}</h2>
            <h2>Total Amount : ${carStore.totalPrize}</h2>
        </>
    )
}

export default observer(ShoppingCart);