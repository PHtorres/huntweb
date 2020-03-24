import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

export default function Product(props) {
    const [Product, setProduct] = useState({});
    const [Id, setId] = useState(props.match.params.id);

    useEffect(() => {
        loadProduct();
    }, [])

    async function loadProduct() {
        const response = await api.get(`/products/${Id}`);
        setProduct(response.data);
    }


    return (
        <div className="product-info">
            <h1>{Product.title}</h1>
            <p>{Product.description}</p>
            <p>
                <a href={Product.url}>{Product.url}</a>
            </p>
        </div>
    );
}