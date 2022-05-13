<template>
  <div>
    <div class="container">
      <a href="https://watchlist.net" class = "title">Watchlist</a>

      <form @submit.prevent = "handleSubmitForm">
        <div class="form-group"> 
          <label for = "stocks">Stock Ticker:</label>
          <div class="form-group-inner">
            <input type="text" class="stocks" v-model = "stock.name" placeholder = "BTC" required>
            <button class = "add">Add</button>
            <p class = "info">Input stock Ticker</p>
          </div>
        </div>
      </form> 

      <div class="stock-container">
        <div class="stocksname" v-for = "(item, name) in StocksList.RAW" :key="item._id">
          <p class = "price">${{formatPrice(item)}}</p>
          <div class="lower">
              <p class = "stock-label">{{name}}</p>
              <button class = "delete-btn" @click.prevent="deleteStock(name)"><img src = "@/assets/delete.png" alt = "delete"></button>
          </div>
        </div>  
      </div>      
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        baseApiUrl: 'http://localhost:4000/api',
        stock: {
          name:''
        },
        Stocks: [],
        StocksList: {}
      }
    },
    created (){
      this.getStocks()
    },
    methods: {
      getStocks() {
        axios.get(this.baseApiUrl).then(res => {
          this.Stocks = res.data;
          console.log(this.Stocks)
          let names = Array.prototype.map.call(this.Stocks, s=>s.name).toString();
          console.log(names)
          axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${names}&tsyms=USD&api_key=1857384eb534d30bc84db3e18bfa41915ce3955213e3f7a699c33a67c28101c1`).then(res => {
            this.StocksList = res.data
            console.log(this.StocksList.RAW.BTC.USD.PRICE)
          }).catch(error => {
            console.log(error)
          })
        })
      },
      handleSubmitForm() {
        axios.post(this.baseApiUrl + '/add-stock', this.stock).then(() => {
          console.log(this.stock)
          this.stock = {
            name:''
          }
          this.getStocks()
        }).catch(error => {
          console.log(error)
        })
      },
      formatPrice(name) {
        console.log(name)
        return name.USD.PRICE
      },
      deleteStock(name){
        console.log(this.Stocks)
        let foundObj = this.Stocks.find(x => x.name === name)
        let indexOfArrayItem = this.Stocks.findIndex(i => i._id === foundObj._id)
        axios.delete(`${this.baseApiUrl}/delete-stock/${foundObj._id}`).then (() => {
          this.Stocks.splice(indexOfArrayItem, 1);
          this.getStocks()
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;700&display=swap');
* {
  box-sizing: border-box;
}
body {
  background-color: #242628;
  color: white;
  margin: 0;
  height: 100vh;
  font-family: "Poppins";
}
.title {
  text-decoration: none;
  color: inherit;
  font-size: 3em;
  margin: 10em 0 1em 0;
}
.container {
  text-align: center;
  margin: 0 1em;
}
.form-group {
  text-align: left;
  width: 300px;
  margin: 7em auto;
}
label {
  font-weight: bold;
  margin-bottom:.7em;
  display: block;
}
input {
  padding: 1em;
  outline: none;
  border: none;
  border-top-left-radius: .3em;
  border-bottom-left-radius: .3em;
  font-size: 1.3em;
}
.form-group-inner {
  display:grid;
  grid-template-columns: 100px auto;
}

button.add {
  font-size: 1em;
  font-weight: bold;
  color: white;
  background: #9100FF;
  border: none;
  outline: none;
  padding: 1em 3em;
  border-top-left-radius: .3em;
  border-bottom-left-radius: .3em;
}
p.info {
  color:#7794B0;
}
.stock-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  grid-gap: 1em;
}
.stocksname {
  background:#32373c;
}
.price{
  font-size: 3em;
  font-weight: 200;
  padding: 0 1em;
}

.lower{
  background: #292D30;
  padding: 1em;
  position: relative;
  height: 100px;
}
.stock-label{
  text-transform: uppercase;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: -1.5em;
  color: #788591;
}

.delete-btn{
  background: none;
  border: none;
  position: absolute;
  right: 1em;
  bottom: 1em;
  cursor: pointer;
  outline: none;
}
</style>
