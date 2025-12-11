export interface Product {
  id?: number;       
  code?: string;      
  name: string;      
  quantity: number;  
  createdAt?: string; 
}

export type ProductCreation = Omit<Product, 'id' | 'code' | 'createdAt'>;