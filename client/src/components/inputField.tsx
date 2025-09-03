import { type ChangeEvent, type FC, type ReactElement } from "react"
type inputFieldPropTypes = {
    type:'text' | 'number' | 'file', 
    label: 'name' | 'price' | 'description' | 'image',
    placeholder:string,
    inputChange:(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
}

const InputField:FC<inputFieldPropTypes> =({type, label, placeholder, inputChange}):ReactElement=>{
    return(
        <div className="form-input">
            <label>
                {label}
            </label>
            {
                label !== "description" && (
                    <input 
                        type={type}
                        placeholder={placeholder}
                        name={label}
                        onChange={inputChange}
                    />
                ) 
            }

            {
                label ==='description' && (
                    <textarea rows={8} placeholder={placeholder} name={label} onChange={inputChange}/>
                )
                
            }
            
        </div>
    )
}

export default InputField