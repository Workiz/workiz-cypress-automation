export class RandomFunctions {
    
    public static generateRandomString(length:number): string {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
                return result;
    }

    static generateFullName():string {
        return this.generateRandomString(7) + ' ' + this.generateRandomString(7);
    }

    public static generateRandomEmail(): string {
        let email = Math.random().toString(36).substring(2, 5) + '@workiz.com'
        return email;
    }

    public static generateRandomPhone(): string {
        let phone = (Math.floor(Math.random() * 100000000)).toString();
        return phone;
    }
}