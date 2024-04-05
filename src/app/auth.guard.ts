import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot,  CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SellerService } from './services/seller.service';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate{
 
  constructor(private sellerService: SellerService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('seller')) {
      return true
    }
    return this.sellerService.isSellerLoggedIn;
  }
}
 