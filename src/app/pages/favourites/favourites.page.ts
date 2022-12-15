import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  listData:any[]=[];
  constructor(private router:Router,private storageService: StorageService) { 
    this.loadData();
  }

  ngOnInit() {}
  async loadData(){
    await this.storageService.init();
    this.listData=await this.storageService.getData();
  }
}
