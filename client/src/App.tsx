import { useState, type ChangeEvent, type FormEventHandler, type FormEvent } from 'react'
import './assets/styles/style.css';
import InputField from './components/inputField';

interface product{
  name:string,
  price:number,
  description:string,
  image:File | null
}

function App() {
  const [productData, setProductData] = useState<product>({name:"", price:0, description:"", image:null})
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const inputTextChange=(type:string, e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const text = e.target.value
    setProductData(prevState=>({...prevState, [type]:text}))
  }

  const onImageUpload=(e:ChangeEvent<HTMLInputElement>)=>{
    if(!e.target.files){
      setProductData(prevState=>({...prevState, 'image':null}))
    }

    const imageFile = e.target.files?.[0]
    if(imageFile){
      setProductData(prevState=>({...prevState, 'image':imageFile}))
      setImagePreview(URL.createObjectURL(imageFile))
    }
  }

  const handleFormSubmit =(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log('senbdinbg data')
    const {name, price, description, image} = productData
    if(!name || !price || !description || !image)return

    const formData = new FormData()
    Object.entries(productData).forEach(([key, value])=>formData.append(key, value))

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
   
    fetch(
      'http://localhost:8000/product',
      { 
        method:'POST',       
        body:formData
      }
    )
  }


  return (
    <main>
      <h3>Add new product</h3>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <InputField 
          type='text'
          placeholder='Product name'
          label='name'
          inputChange={(e)=> inputTextChange('name', e)}
        />
        <InputField 
          type='number'
          placeholder='Product price'
          label='price'
          inputChange={(e)=> inputTextChange('price', e)}
        />
        <InputField 
          type='text'
          placeholder='Product description'
          label='description'
          inputChange={(e)=> inputTextChange('description', e)}
        />
        <div className="form-input">
          <label>Please upload a product image</label>
          <input type='file' onChange={(e)=>onImageUpload(e)}/>
        </div>
        {
          imagePreview && (
            <img src={imagePreview} alt='image preview'/>
          )
        }

        <div className="form-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  )
}

export default App
