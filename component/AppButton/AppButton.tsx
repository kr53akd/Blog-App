import { AppButtonProp } from '@/lib/customTypes'

const AppButton = ({type, name, isPending, ...rest}:AppButtonProp) => {
  return (
    <button type={type} className={`${rest?.coustomClass} bg-blue-500 w-full px-3 py-2 rounded-xl cursor-pointer text-white`}>
     {isPending?<span>{name}ing...</span>:<span>{name}</span>}
    </button>
  )
}

export default AppButton