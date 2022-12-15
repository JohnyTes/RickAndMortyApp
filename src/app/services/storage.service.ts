import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
const STORAGE_KEY='mylist';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage:Storage) {
    this.init();
   }
  
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  getData() {
    return this._storage?.get(STORAGE_KEY)||[];
  }
  async addData(item:any){
    const storedData=await this.storage.get(STORAGE_KEY)||[];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY,storedData);
  }
  async removeItem(index:any){
    const storedData=await this.storage.get(STORAGE_KEY)||[];
    storedData.splice(index,1);
    return this.storage.set(STORAGE_KEY,storedData);
  }
}
