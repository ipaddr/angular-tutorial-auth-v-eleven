import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  subUser: Subscription

  constructor(private dataStorageService: DataStorageService,
    private authServ: AuthService) {}


  ngOnInit(): void {
    this.subUser = this.authServ.userSubject.subscribe(
      user => {
        console.log(!user);
        console.log(!!user);
        this.isAuthenticated = !!user;
      }
    );
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  logout(){
    this.authServ.logout();
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }
}
