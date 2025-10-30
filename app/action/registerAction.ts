"use server"

export const registerAction =  async( prevState:{ message: string, isSuccess: boolean}, formData: FormData,) =>{
    console.log(formData, 4)
    return {message:"called the server function", isSuccess: true}
}