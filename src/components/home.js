import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../App.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showUpdateModal: false,
            product: [],
            userData: null,
            selectedProduct: null,
            name: '',
            productType: '',
            redirectOnSubmit: false,
        }

        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeProductType = this.onChangeProductType.bind(this);
        this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
    }
    
    onChangeName(e) {
        this.setState({name: e.target.value});
    }

    onChangeProductType(e) {
        this.setState({productType: e.target.value});
    }

    onSubmitUpdate(e) {
        e.preventDefault();
        this.setState({ redirectOnSubmit: true});
        const obj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYi5jIiwidXNlcklkIjoiNWNkYmNmM2U4Y2EwMzkyZWY4ZjVmYjJiIiwidXNlclR5cGUiOiJQYXJ0bmVyIiwiaWF0IjoxNTU4MDc1MTg1LCJleHAiOjE1NjY3MTUxODV9.X2myo5q8Ioqa8swqZGFQURre6XFFcmGF_gq4KGrAAjE'
            },
            body: JSON.stringify({
                productId: this.state.selectedProduct,
                name: this.state.name,
                productType: this.state.productType,
            }),
        };
        console.log(obj);

        fetch('http://localhost:8080/restapi_0/products', obj)
        .then( response => {
            return response.json();
        })
        .then( data => {
            console.log(data);
        })
        .catch( err => {
            console.log(err);
        })

        
    }

    onClickUpdate(e) {
        this.state = {
            selectedProduct: e.target.id,
            showUpdateModal: true
        }

        this.setState({showUpdateModal: true});
        this.setState({selectedProduct: e.target.id})

        if (this.state.showUpdateModal) {
            const obj = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYi5jIiwidXNlcklkIjoiNWNkYmNmM2U4Y2EwMzkyZWY4ZjVmYjJiIiwidXNlclR5cGUiOiJQYXJ0bmVyIiwiaWF0IjoxNTU4MDc1MTg1LCJleHAiOjE1NjY3MTUxODV9.X2myo5q8Ioqa8swqZGFQURre6XFFcmGF_gq4KGrAAjE',
                    'mode': 'no-cors'
                },        
            }
    
            fetch('http://localhost:8080/restapi_0/products/id/' + this.state.selectedProduct, obj)
            .then( response => {
                return response.json();
            })
            .then( data => {
                console.log(data.result);
                const productUpdate = data.result.map((product) => {
                    return(
                        <form key={product._id} onSubmit={this.onSubmitUpdate}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder={product.name}
                                    onChange={this.onChangeName}
                                    />
                            </div>

                            <div className="form-group">
                                <label>Product Type:</label>
                                <select
                                    className="form-control"
                                    name="productType"
                                    placeholder={product.productType}
                                    onChange={this.onChangeProductType}
                                    required
                                    >
                                    
                                    <option value=""> -- Select Product Type -- </option>
                                    <option value="Game">Game</option>
                                    <option value="TwitchProduct">TwitchProduct</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Update Product" className="btn btn-success"/>
                            </div>
                        </form>
                    )

                })
                this.setState({productUpdate:productUpdate});
            })
            .catch( err => {
                console.log(err);
            })
        }
    }

    onClickModalClose = () => {
        this.setState({ showUpdateModal: false });
    }


    componentDidMount() {
        if (sessionStorage.getItem('userData')) {
            // const userData = JSON.parse(sessionStorage.getItem('userData'));
            // this.setState({ userData: userData });
            // console.log(this.state.userData);
            const obj = {
                method: 'get',
                headers: new Headers({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYi5jIiwidXNlcklkIjoiNWNkYmNmM2U4Y2EwMzkyZWY4ZjVmYjJiIiwidXNlclR5cGUiOiJQYXJ0bmVyIiwiaWF0IjoxNTU4MDc1MTg1LCJleHAiOjE1NjY3MTUxODV9.X2myo5q8Ioqa8swqZGFQURre6XFFcmGF_gq4KGrAAjE'
                })
             }
            
            fetch('http://localhost:8080/restapi_0/products', obj)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    const productList = data.result.map((product) => {
                        return (
                            <li key={product._id}>
                                <div className="card">
                                    <div className="buttons p-2">
                                        <button className="btn btn-warning mx-1" onClick={this.onClickUpdate} id={product._id}>Update</button>
                                        <button className="btn btn-danger mx-1" >Delete</button>
                                    </div>

                                    <div className="card-body">
                                        <h2 className="card-title">{product.name}</h2>
                                        <p className="card-subtitle">{product.productType}</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })

                    this.setState({product: productList});
                })
            

        } else {
            this.setState({redirect: false});
        }  
        
    }

    render() {
        
        if ( this.state.redirect ) {
            return (<Redirect to={'/login'}/>)
        }

        if ( this.state.redirectOnSubmit ) {
            return (<Redirect to={'/home'}/>);
        }
        return (
            <div className="mt-4 container-fluid">
                <h3>Welcome to Quest God</h3>
                <a href="http://localhost:3000/product/add" className="btn btn-success my-4">Create New Product</a>

                <div className="product-content mx-4">
                    {this.state.product}
                    {this.state.showUpdateModal?
                    <div className="modal-wrapper">
                        <div className="modal-content px-5 py-3">
                            <h3>Update Product</h3>
                            <button className="modal-close" onClick={this.onClickModalClose.bind(this)}>X</button>
                            {this.state.productUpdate}
                        </div>
                    </div> : <div></div>
                    }
                </div>
                
            </div>
        )
    }
}

export default Home;