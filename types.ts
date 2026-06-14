export interface Category {
    id: number;
    name: string;
}

export interface ProductImage {
    id: number;
    product_id: number;
    image_url: string;
    is_main: boolean;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    wood_type: string;
    pieces: number;
    description: string;
    category_id: number;
    category?: Category;
    images?: ProductImage[];
}