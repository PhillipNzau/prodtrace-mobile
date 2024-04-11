import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PpuDataService extends DefaultDataService<any> {
  ///// PPU URL
  listPpusUrl = environment.listPpusUrl;

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Ppu', http, httpUrlGenerator);
  }

  override getAll(): Observable<any[]> {
    return this.http.get(this.listPpusUrl).pipe(
      map((ppus: any) => {
        return ppus.data;
      })
    );
  }
}
