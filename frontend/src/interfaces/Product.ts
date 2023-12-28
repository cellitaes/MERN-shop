export interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: { _id: string; name: string };
}
