"use client";
import { postAction } from "@/app/action/registerAction";
import AppButton from "@/component/AppButton/AppButton";
import AppInput from "@/component/AppInput/AppInput";
import { useActionState, useEffect } from "react";

const CreatePostPage = () => {
  const [state, postCreateAction, isPending] = useActionState(postAction, {
    message: "",
    isSuccess: false,
  });

  useEffect(() => {
    if (state.message) {
        alert(state.message);
    }
   
  }, [state]);

 
  
  return (
    <div className="w-9/10 h-screen  flex items-center justify-center">
      <form
        action={postCreateAction}
        className="w-6/12 space-y-5 flex flex-col"
      >
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <AppInput name="title" type="text" placeholder="Enter post title" />
        <AppInput type="text" name="image" placeholder="Image URL" />
        <AppInput type="text" name="category" placeholder="Category" />
        <textarea
          name="content"
          placeholder="Enter post content"
          className="h-20 rounded-2xl p-2 border text-sm scrollbar-hide"
        />
        <AppButton
          type="submit"
          name="Submit"
          coustomClass="px-4 py-2 bg-blue-500 text-white rounded"
          isPending={isPending}
        />
      </form>
    </div>
  );
};

export default CreatePostPage;
