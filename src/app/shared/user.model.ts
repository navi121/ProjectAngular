import { Image } from "angular-responsive-carousel";

export class User {
    MobileNumber: string;
    Password: string;
    Email: string;
    FirstName: string;
    LastName: string;
    SecurityAnswer: string;
    SecurityQuestion: string;
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
}
export class CartItem{
    productName: string;
    productDescription: string;
    price: string;
    size: string;
    quantity: string;
    total: string;
}
export class Reset{
    Email: string;
}
export class Pass{
    Password: string;
    MobileNumber:string;
    SecurityAnswer:string;
    SecurityQuestion: string;
}
export class Admin{
    Admin: string;
    Password: string;
}
export class Search{
    ProductName: string;
}
export class Img{
    image: string;
}
