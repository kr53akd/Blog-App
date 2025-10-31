export function generateOtp(){
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return Number(randomNum);
}