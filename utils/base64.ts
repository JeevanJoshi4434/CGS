export class Base64 {
    
    /**
     * Converts a string to base64
     * @param str string to encode
     * @returns  encoded string
     */
    static encode(str: string): string {
        return Buffer.from(str).toString('base64');
    }


    /**
     * Converts a base64 string back to regular text
     * @param str string to decode
     * @returns decoded string
     */
    static decode(str: string): string {
        return Buffer.from(str, 'base64').toString('utf-8');
    }

    /**
     * Validates if a string is base64 encoded
     * @param str string to validate
     * @returns Boolean 
     */
    static isBase64(str: string): boolean {
        try {
            return Buffer.from(str, 'base64').toString('base64') === str;
        } catch (err) {
            return false;
        }
    }
}