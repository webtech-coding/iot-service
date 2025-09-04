import { useEffect, useState } from 'react'
import mqtt from 'mqtt'
import ProductCard from './productCard'
import './index.css';

function App() {

  const [allProducts, setAllProducts] = useState([])


  useEffect(()=>{
    const client = mqtt.connect('ws://localhost:9001/mqtt')
    client.subscribe('products', {qos:2}, (err)=>{
      console.log('Waiting for products changes...', err)
    })

    client.on('message',(topic, rawMessage)=>{
      if(topic ==="products"){
        const message = rawMessage.toString();
        const products = JSON.parse(message);
        setAllProducts(products)
      }
    })

  },[])

  return (
    <div className='products'>
      {
        allProducts.map(product=><ProductCard  product={product}/>)
      }
    </div>
  )
}

export default App
