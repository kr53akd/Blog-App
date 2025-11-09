 export type AppInputProp = {
    type: string
    name: string
    placeholder?: string
    defaultValue?: string | number
    coustomClass?: string
    required?: boolean,
    showPassword?: boolean
    options?: {label:string, value: string|number}[],
    togglePassword?: (e:React.MouseEvent)=> void
};

export type AppButtonProp = {
    type?: "submit" | "reset" | "button" | undefined
    name: string
    isPending?: boolean
    coustomClass?: string
}

export type postType = {
    id: number,
    title: string,
      author: string,
      date: string,
      image: string,
      tag: string,
}