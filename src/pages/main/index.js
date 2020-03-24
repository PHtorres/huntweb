import React, { useState, useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import {Link} from 'react-router-dom';

export default function Main() {

    const [Products, setProducts] = useState([]);
    const [ProductsInfo, setProductsInfo] = useState({});
    const [Page, setPage] = useState(1);

    useEffect(() => { LoadProdcts(1) }, []);

    async function LoadProdcts(page) {
        const response = await api.get(`products?page=${page}`);
        const { docs, ...productsInfo } = response.data;
        setProducts(docs);
        setProductsInfo(productsInfo);
        setPage(page);
    }

    function prevPage() {
        if (Page === 1) return;

        LoadProdcts(Page - 1);
    }

    function nextPage() {
        if (Page === ProductsInfo.pages) return;

        LoadProdcts(Page + 1);
    }

    return (
        <div className="product-list">
            {Products.map(product => (
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>
                    <Link to={`/products/${product._id}`}>Acessar</Link>
                </article>
            ))}
            <div className="actions">
                <button disabled={Page === 1} onClick={() => prevPage()}>Anterior</button>
                <button disabled={Page === ProductsInfo.pages} onClick={() => nextPage()}>Próxima</button>
            </div>
        </div>
    )
}