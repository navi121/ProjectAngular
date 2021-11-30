export class User {
    mobileNumber: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    securityAnswer: string;
    securityQuestion: string;
    userId: string;
}

export class UserLog {
    Password: string;
    Email: string;
}

export class AddItem{
    productName: string;
    productDescription: string;
    price: string;
    size: string;
    image: string;
    quantity: string;
    total: string;
    category:string;
    image1: string;
    image2: string;
}
export class CartItem{
    productName: string;
    productDescription: string;
    price: string;
    size: string;
    quantity: string;
    total: string;
    image: string;
    image1: string;
    image2: string;
    category:string;
}
export class Reset{
    Email: string;
}
export class Pass{
    ConfirmPassword: string;
    Password: string;
    MobileNumber:string;
    SecurityAnswer:string;
    SecurityQuestion: string;
}
export class Admin{
    Email: string;
    Password: string;
}
export class Search{
    ProductName: string;
}
export class Img{
    image: string;
}
export class PlaceOrder{
    name: string;
    mobileNumber: string;
    address: string;
    state: string;
    country: string;
    zipCode: string;
    productName: string;
    productDescription: string;
    price: string;
    size: string;
    quantity: string;
    total: string;
}

export class Filter{
    static readonly type = '[Price] Filter Price';
    constructor(public price: string) {}
}