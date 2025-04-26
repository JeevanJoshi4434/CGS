export function generateOTP(length = 6): string {
    const characters = '0123456789';
    let otp = '';
    
    for (let i = 0; i < length; i++) {
        // Simple pseudo-random (NOT cryptographically secure)
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters[randomIndex];
    }
    
    return otp;
}
