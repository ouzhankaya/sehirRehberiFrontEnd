import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { Photo } from '../models/photo';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

constructor(private httpClient:HttpClient,
  private alertifyService:AlertifyService,
    private router:Router) { }

path="https://localhost:44334/api/";

getCities():Observable<City[]>{

  return this.httpClient.get<City[]>(this.path +"cities");
}

getCityByID(cityId):Observable<City>{
return this.httpClient.get<City>(this.path +"cities/detail?id="+cityId);
}

getPhotosByCity(cityId):Observable<Photo[]>{
  return this.httpClient.get<Photo[]>(this.path +"cities/photos/?cityId=" +cityId);
}

add(city){
  this.httpClient.post(this.path + "cities/add", city).subscribe(data=>{
    this.alertifyService.success("Şehir başarıyla eklendi.")
    this.router.navigateByUrl('/cityDetail/'+data["id"])
  })
}

}
