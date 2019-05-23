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
            userData: null
        }
    }

    // showAddProduct = () => {
    //     this.setState({ showUpdateModal: true });
    // };

    // hideAddProduct = () => {
    //     this.setState({ showUpdateModal: false });
    // };

    onClickUpdate = () => {
        this.setState({ showUpdateModal: true });
        if (this.state.showUpdateModal) {
            const updateModal = (
                <div className="modal-wrapper">
                    <div className="modal-content">
                        <h3>Update Product</h3>

                    </div>
                </div>
            )
        }
        
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
                                        <button className="btn btn-warning mx-1" onClick={this.onClickUpdate}>Update</button>
                                        <button className="btn btn-danger mx-1">Delete</button>
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

        return (
            <div className="mt-4 container-fluid">
                <h3>Welcome to Quest God</h3>
                
                {/* <Link to={'/product/add'} className="btn btn-success my-4">Create New Product</Link> */}
                <a href="http://localhost:3000/product/add" className="btn btn-success my-4">Create New Product</a>

                <div className="product-content mx-4">
                    {this.state.product}
                </div>
                
            </div>
        )
    }
}

export default Home;