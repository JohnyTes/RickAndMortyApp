import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev?: any;
}
export interface RootObject {
  info: Info;
  results: Result[];
}
export interface Result {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}
export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }
    getCharacters(page=1):Observable<RootObject>{
    return this.http.get<RootObject>(`${environment.baseUrl}/character?page=${page}`)
  }
  getCharacterDetails(id: string){
    return this.http.get(`${environment.baseUrl}/character/${id}`)
  }
  getEpisodeDetails(site:any){
    return this.http.get(site)
  }
}
