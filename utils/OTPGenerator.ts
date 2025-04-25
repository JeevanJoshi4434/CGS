export function generateOTP(length = 6){
    const characters = '0123456789';
    let otp = '';
    // Use crypto.getRandomValues for better randomness
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
  
    for (let i = 0; i < length; i++) {
      otp += characters[randomValues[i] % characters.length];
    }
    return otp;
  }