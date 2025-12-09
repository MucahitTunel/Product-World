export interface ProductReview {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface ProductMeta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrcode: string;
}

export interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Product {
    id: string;
    title: string;
    category: string;
    price: number;
    description: string;
    discountPercentage?: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: ProductDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: ProductReview[];
    returnPolicy: string;
    minimumOrderQuantity?: number;
    meta: ProductMeta;
    thumbnail: string;
    images: string[];
}

export interface ProductResponse {
    products: Product[];
    total: number;
    page: number;
    limit: number;
}

export type ProductAvailabilityStatus = 'In Stock' | 'Low Stock';