import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { CharacterService } from 'src/app/services/character.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.page.html',
  styleUrls: ['./character-details.page.scss'],
})
export class CharacterDetailsPage implements OnInit {
  character:any=null;
  firstEpisode:any=null;
  lastEpisode:any=null;
  listData:any[]=[];
  isFavourite:any;
  toBeRemoved:any
  constructor(private route: ActivatedRoute, private characterService: CharacterService,private storageService: StorageService) {
    this.isInFavourites();
  }

  ngOnInit() {
    const id:any=this.route.snapshot.paramMap.get('id');
    this.characterService.getCharacterDetails(id).subscribe((res)=>{
      this.character=res;
      this.characterService.getEpisodeDetails(this.character.episode[0]).subscribe((res)=>{
        this.firstEpisode=res;
      })
      this.characterService.getEpisodeDetails(this.character.episode[this.character.episode.length-1]).subscribe((res)=>{
        this.lastEpisode=res;
      })
    })
  }
  async loadData(){
    await this.storageService.init();
    this.listData=await this.storageService.getData();
  }
  async addData(item:any){
    await this.storageService.addData(item);
    this.loadData();
    this.isFavourite=true;
  }
  async removeItem(){
    if (this.listData!=null) {
      for (let index = 0; index < this.listData.length; index++) {
        const element = this.listData[index];
        if(Object.values(element)[0]==this.character?.id){
          this.toBeRemoved=index;
          break;
        }
      }
    }
    this.storageService.removeItem(this.toBeRemoved);
    this.listData.splice(this.toBeRemoved);
    this.isFavourite=false;
  }
  async isInFavourites(){
    await this.loadData();
    this.isFavourite= false;
    if (this.listData!=null) {
      for (let index = 0; index < this.listData.length; index++) {
        const element = this.listData[index];
        if(Object.values(element)[0]==this.character?.id){
          this.isFavourite= true;
          break;
        }
      }
    }
  }
}
