const ProductCard=({product})=>{
    return(
        <div className="product-card">
            <img src={product.imageUrl} />
            <div className="product-name">{product.name}</div>
            <div className="price">€{product.price}</div>
        </div>
    )
}

export default ProductCard