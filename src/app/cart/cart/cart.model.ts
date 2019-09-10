import { Product } from 'src/app/shared/product.model';

export class Cart {
    public products: Array<Product>;
    public totalPrice: number;

    constructor(products?: Array<Product>) {
        this.products = products ? products : [];
    }

    getCart(): Array<Product> {
        console.log(this.products);
        return this.products;
    }

    setProducts(products) {
        console.log(products);
        this.products = products;
    }

    addProduct(product: Product) {
        let productId = product.id;
       
        if (!this.checkForDublicates(productId)) {
            product["productQuantity"] = 1;
            this.products.push(product);
            
        } else {
            this.products.forEach( item => {
                if (item.id == productId ) {
                    item["productQuantity"] += 1;
                }
            }) 
        }

        this.calculateTotalPrice();    
    }

    deleteProductById(id) {
        let deleteWithId;
        this.products.forEach( (item, index) => {
            if ( item.id == id ) {
                deleteWithId = index;
            }
        });
        this.products.splice(deleteWithId, 1);
    }

    checkForDublicates(id): boolean {
        let isDublicated = false;
        this.products.forEach( item => {
            if (item.id == id) {
                isDublicated = true
            }
        });
    
        return isDublicated;
    }

    calculateTotalPrice() {
        let price = 0;
        this.products.forEach( item => {
            price += item.productPrice * item.productQuantity;
        });

        this.totalPrice = price;
    }

    getTotalPrice() {
        this.calculateTotalPrice();
        return this.totalPrice;
    }  

    calculateProductsQuantity(): number {
        let productQuantity = 0;

        this.products.forEach( item => {
            productQuantity += item.productQuantity;
        });

        return productQuantity;
    }

    cleanCart() {
        this.products = [];
    }
}