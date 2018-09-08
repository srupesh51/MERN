import React, { Component } from 'react';

import logo from './logo.svg';
import Product from './components/products'
import './App.css';

class App extends Component {
  state = {
    status: '',
    products: [],
    title:'',
    price:'',
    completed: true
  }
  constructor(props){
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ status: res.status, products: res.products }))
      .catch(err => console.log(err));
      this.state.completed = !this.state.completed
  }
  callApi = async () => {
    const response = await fetch('/api/v1/products');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  onSubmit(e) {
        const product = {
          title: this.state.title,
          price: this.state.price
        }
        e.preventDefault();
        fetch('/api/v1/new-product', {
         method: 'post',
         headers: {'Content-Type':'application/json'},
         body: JSON.stringify(product)
       }).then(res => {
         if(res.status === 400){
           throw Error('Bad Request');
         }
       }).catch(err => console.log(err));
       this.state.completed = !this.state.completed;
    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }
  render() {
    return (
      <div className="App">
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    {this.state.products.map(Product)}
  </tbody>
</table>
<form onSubmit={this.onSubmit}>
  <div class="form-group">
    <label for="exampleInputEmail1">Title</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Title"
    value={this.state.title} onChange={this.onChangeTitle} />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Price</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Price"
    value={this.state.price} onChange={this.onChangePrice} />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
      </div>
    );
  }
}

export default App;
