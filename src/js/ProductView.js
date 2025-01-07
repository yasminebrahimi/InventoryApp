import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product"); 
const searchInput = document.querySelector("#search-input"); 
const selectedSort = document.querySelector("#sort-products");
const deleteProduct = document.querySelector("#delete-product"); 


class ProductView{
    constructor() {
        addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
        searchInput.addEventListener("input", (e) => this.searchProducts(e)); 
        selectedSort.addEventListener("change", (e) => this.sortProdcuts(e)); 
        this.products = [];
      }

      setApp() {
        this.products = Storage.getAllProducts();
      }
      addNewProduct(e) {
        e.preventDefault();
        const title = document.querySelector("#product-title").value;
        const quantity = document.querySelector("#product-quantity").value;
        const category = document.querySelector("#product-category").value;
        if (!title || !category || !quantity) return;
        Storage.saveProducts({ title, category, quantity });
        this.products = Storage.getAllProducts();
        this.createProductsList(this.products);
      }


      createProductsList(products) {
        let result = ""; 
        products.forEach((item) => {
            const selectedCategory = Storage.getAllCategories().find((c) => c.id = item.category); 
          result += `<div class="flex items-center justify-between mb-2 w-full min-w-[400px]">
          <span class="text-slate-400">${item.title}</span>
          <div class="flex items-center gap-x-3">
            <span class="text-slate-400">${new Date().toLocaleDateString("de-DE")}</span>
            <span class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm 
            rounded-2xl">${selectedCategory.title}</span>
            <span
              class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2
             border-slate-300 text-slate-300">${item.quantity}</span>
            <button class="delete-product border px-2 py-o.5 rounded-2xl border-red-400 text-red-400" 
            data-product-id=${item.id} id="delete-product">delete</button>
          </div>
        </div>`;
        });
        const productsDOM = document.getElementById("products-list");
        productsDOM.innerHTML = result;

        const deleteBtns = [...document.querySelectorAll(".delete-product")];
        deleteBtns.forEach((item) => {
          item.addEventListener("click", (e) => this.deleteProduct(e)); 
        }); 
      }


      searchProducts(e) {
        const value = e.target.value.trim().toLowerCase(); 
        const filteredProducts = this.products.filter((p) => p.title.toLowerCase().includes(value)); 
        console.log(this.products); 
        this.createProductsList(filteredProducts); 
      }
    
      sortProdcuts(e){
        const value = e.target.value;
        console.log({ value }); 
        this.products = Storage.getAllProducts(value); 
        this.createProductsList(this.products); 
      }

      deleteProduct(e){
        const productId = e.target.dataset.productId; 
        Storage.deleteproduct(productId); 
        this.products = Storage.getAllProducts(); 
        this.createProductsList(this.products); 
      }
}


    

export default new ProductView(); 


