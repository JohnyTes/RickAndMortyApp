import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { EMPTY, isEmpty } from 'rxjs';
import { CharacterService } from 'src/app/services/character.service';
import { Router } from '@angular/router';
import { isTabSwitch } from '@ionic/angular/directives/navigation/stack-utils';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  characters:any[]=[];
  currentPage=1;
  searchTerm:string='';
  maxPages=-1;
  allCharacters:any[]=[];
  displayList:boolean=true;
  constructor(private characterService: CharacterService, private loadingCtrl:LoadingController,private router:Router) { }
  
  ngOnInit() {
    this.loadCharacters();
    this.setMaxPages();
  }
  async loadCharacters(event?: any){
    const loading=await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles'
    });
    await loading.present();
    this.characterService.getCharacters(this.currentPage).subscribe(res=>{
      loading.dismiss();
      this.characters.push(...res.results);
      event?.target.complete();
    })
  }
  loadMore(event: any){
    this.currentPage++;
    this.loadCharacters(event);
  }
  setMaxPages(){
    this.characterService.getCharacters(this.currentPage).subscribe(res=>{
      this.maxPages=res.info.pages;
      this.loadAllCharacters();
    })
  }
  noData(){
    if(this.currentPage!=this.maxPages){
      return true;
    }
    return false;
  }
  loadAllCharacters(){
    for (let index = 1; index < this.maxPages+1; index++) {
      this.characterService.getCharacters(index).subscribe(res=>{
        this.allCharacters.push(...res.results);
      }) 
    }
  }
  searchInput(event?: any){
    if (event?.target.value=="") {
      this.displayList=true;
    }else{
      this.displayList=false;
    }
  }
  
}
