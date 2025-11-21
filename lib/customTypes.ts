import { tag } from './../node_modules/effect/src/Match';
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
    title: string;
    image: string;
    category: string;
    content: string;
    id: number;
    authorName: string | null;
    createdAt: Date;
    updatedAt: Date;
    authorId: number | null;
    tag?: string | null;
}