import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../common/api.service';
import { CartEndPoints } from '../../../endpoint/endpoints'
import { CartRequest } from '../../models/ResquestResponse/Cart/cart-request';
import { BaseResponse } from '../../models/common/base-response';
import { CartResponse } from '../../models/ResquestResponse/Cart/cart-response';
import { Cart } from '../../models/model-object/cart.model';
import { Product } from '../../models/model-object/product.model';

export interface CartDisplayItem {
    product: Product;
    quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService{
 private api = inject(ApiService);

 readonly items = signal<CartDisplayItem[]>([]);
 readonly isOpen = signal(false);
 readonly isEmpty = computed(() => this.items().length === 0);
 readonly totalQuantity = computed(() =>
     this.items().reduce((total, item) => total + item.quantity, 0)
 );
 readonly subtotal = computed(() =>
     this.items().reduce((total, item) => total + item.product.price * item.quantity, 0)
 );

 addItem(product: Product): void {
     this.items.update(items => {
         const existingItem = items.find(item => item.product.id === product.id);

         if (existingItem) {
             return items.map(item => item.product.id === product.id
                 ? { ...item, quantity: item.quantity + 1 }
                 : item
             );
         }

         return [...items, { product, quantity: 1 }];
     });
     this.openDrawer();
 }

 changeQuantity(productId: string, delta: number): void {
     this.items.update(items => items
         .map(item => item.product.id === productId
             ? { ...item, quantity: item.quantity + delta }
             : item
         )
         .filter(item => item.quantity > 0)
     );
 }

 removeItem(productId: string): void {
     this.items.update(items => items.filter(item => item.product.id !== productId));
 }

 openDrawer(): void {
     this.isOpen.set(true);
 }

 closeDrawer(): void {
     this.isOpen.set(false);
 }

 create(request: CartRequest): Observable<BaseResponse<Cart>>{
    return this.api.post<BaseResponse<Cart>>(
        CartEndPoints.create,
        request
    );
 }

 update(request: CartRequest): Observable<BaseResponse<boolean>>{
    return this.api.post<BaseResponse<boolean>>(
        CartEndPoints.update,
        request
    );
 }

 delete(params: string): Observable<BaseResponse<boolean>>{
    return this.api.post<BaseResponse<boolean>>(
        CartEndPoints.delete,
        params
    );
 }

  getAllData(): Observable<BaseResponse<CartResponse>>{
    return this.api.get<BaseResponse<CartResponse>>(
        CartEndPoints.getAll
    );
 }

 getDataById(): Observable<BaseResponse<Cart>>{
    return this.api.get<BaseResponse<Cart>>(
        CartEndPoints.getAll
    );
 }

}