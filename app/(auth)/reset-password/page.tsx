import { Suspense } from "react";
import ResetPassword from "./ResetPassword"

const ResetPasswordForm = () => {
  return (
    <>
    <Suspense fallback={<div></div>}>
    <ResetPassword/>
    </Suspense>
    </>
  )
};
export default ResetPasswordForm;