import {
  makeObservable,
  observable,
  action,
  computed,
  autorun,
  reaction,
  when,
} from "mobx";

class CartStore {
  products = [
    // { id: 1, title: "Laptop", price: 50000 },
    // { id: 2, title: "Mouse", price: 1000 },
    // { id: 3, title: "Keyboard", price: 2000 },
  ];

  cart = [];
  isLoading = false;
  error = null;

  constructor() {
    const saveCart = localStorage.getItem("cart");
    if (saveCart) {
      this.cart = JSON.parse(saveCart);
    }

    makeObservable(this, {
      products: observable,
      cart: observable,
      isLoading: observable,
      error: observable,
      fetchProducts: action,
      addProduct: action,
      deleteProduct:action,
      addToCart: action,
      decreaseQuantity: action,
      clearCart: action,
      totalItems: computed,
      subTotal: computed,
      discount: computed,
      totalPrize: computed,
    });

    autorun(() => {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    });

    reaction(
      () => this.totalItems,
      (totalItems) => {
        console.log(`The prize of ${totalItems} is ${this.totalPrize}.`);
      },
    );

    when(
      () => this.products.length == 0,
      () => this.fetchProducts(),
    );

    when(
      () => this.totalItems > 10,
      () => {
        console.log("Its a Bulk Order.");
      },
    );
  }

  async fetchProducts() {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        throw new Error("Failed to fetch Products");
      }
      const data = await res.json();
      this.products = data;
    } catch (err) {
      this.error = err.message;
      alert(this.error);
    } finally {
      this.isLoading = false;
    }
  }

  async addProduct(product) {
    try {
      this.isLoading = true;
      const res = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error("Failed to add Product");
      }
      const data = await res.json();
      this.products.push(data);
    } catch (err) {
      this.error = err.message;
    } finally {
      this.isLoading = false;
    }
  }

  async deleteProduct(productId){
   try{
    this.isLoading=true;
    this.error=null;

    const res= await fetch(`https://fakestoreapi.com/products/${productId}`,{
      method:"DELETE"
    });
    if(!res.ok){
      throw new Error("Failed to delete the Product");
    }
    this.products=this.products.filter((product)=>product.id!==productId);
   }catch(err){
    this.error=err.message;
   }
   finally{
    this.isLoading=false;
   }

  }
  async updatedProduct(productId,price){
    try{
      this.isLoading=true;
      this.error=null;

      const item = this.products.find((item)=>item.id===productId);
      const product= {...item,price:price};

      const res = await fetch(`https://fakestoreapi.com/products/${productId}`,{
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(product)
      })

      if(!res){
        throw new Error("Failed to Edit the Product");
      }
      const data=await res.json();
      this.products=this.products.map((product)=>productId===product.id ? data:product);
    }catch(err){
      this.error=err.message;
    }
    finally{
      this.isLoading=false;
    }
  }

  addToCart(product) {
    const item = this.cart.find((item) => item.id === product.id);

    if (item) {
      item.quantity++;
    } else {
      const data = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        description: product.description,
        quantity: 1,
      };
      this.cart.push(data);
    }
  }

  decreaseQuantity(product) {
    const item = this.cart.find((item) => item.id === product.id);
    if (!item) return;
    item.quantity--;
    if (item.quantity === 0) {
      this.cart = this.cart.filter((item) => item.id !== product.id);
    }
  }

  get totalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  get subTotal() {
    return this.cart.reduce(
      (totalPrize, item) => totalPrize + item.price * item.quantity,
      0,
    );
  }

  clearCart() {
    this.cart = [];
  }

  get discount() {
    if (this.subTotal < 5000) return 0;
    if (this.subTotal < 10000) return this.subTotal * 0.05;
    if (this.subTotal < 50000) return this.subTotal * 0.1;
    return this.subTotal * 0.15;
  }

  get totalPrize() {
    return this.subTotal - this.discount;
  }

  isInCart(productId) {
    const item = this.cart.find((item) => item.id === productId);
    if (item) {
      return true;
    }
    return false;
  }
}

const carStore = new CartStore();

export default carStore;
