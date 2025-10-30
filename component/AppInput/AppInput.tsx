import { AppInputProp } from '@/lib/customTypes'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'


const AppInput = ({type, name, ...rest}: AppInputProp) => {
    switch (type){
        case "radio":
            const radioOptions = <div className='flex'>{rest?.options?.map(({label, value,}:{label:string, value: string | number}, index: number)=><label htmlFor={name} key={index} className='flex items-center w-fit'>
                <input id={name} type='radio' name={name} value={value} className='me-1 ms-2'/>{label}
                </label>)
            }
            </div>
            return radioOptions;
        case "select":
            return <label htmlFor={name} className='flex border w-full rounded-xl px-2 py-1 text-sm'>
                <select 
                id={name} 
                name={name}
                required={rest?.required}
                defaultValue={rest?.defaultValue}
                className= {`${rest?.coustomClass} w-full focus:outline-none text-gray-500`}
                >
                 {rest?.placeholder && <option value={undefined}>{rest?.placeholder}</option>}
                 {rest?.options?.map(({label, value,}:{label:string, value: string | number}, index: number)=><option key={index} value={value}>{label}</option>)}
                </select>
        </label>
        // default we are using for email password and text
        default: return <label htmlFor={name} className='flex w-full border rounded-xl px-2 py-1 relative'>
            <input 
            id={name} 
            name={name}
            type={!rest?.showPassword? type: "text"}
            placeholder={rest?.placeholder}
            required = {rest?.required}
            defaultValue={rest?.defaultValue}
            className={`${rest?.coustomClass} w-full focus:outline-none text-sm`}
            /> 
            {/* if input type is password then we are showing the eye button to toggle the type from password to text and vice-versa */}
            {type === "password" && (<span onClick={rest?.togglePassword} className='absolute right-2 cursor-pointer'>{rest?.showPassword?<FaRegEye />: <FaRegEyeSlash />}</span>)}
        </label>
    }
}

export default AppInput