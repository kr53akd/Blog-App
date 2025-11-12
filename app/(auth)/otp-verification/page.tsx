import { Suspense } from "react";
import VerificationForm from "./VerificationForm";


const OtpVerification = () => {
 return<>
 <Suspense fallback={<div> chekcing out the page</div>}>
 <VerificationForm/>
 </Suspense>
 </>
};

export default OtpVerification;
