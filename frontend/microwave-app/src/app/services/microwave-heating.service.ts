import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MicrowaveHeating } from '../interfaces/microwave';

@Injectable({
  providedIn: 'root'
})
export class MicrowaveHeatingService {

  constructor(private http: HttpClient ) { }

  startHeating(microwaveHeating: MicrowaveHeating) : any {
    return this.http.post('http://localhost:5204/api/microwave/start', microwaveHeating);
  }

  increase30seconds(microwaveHeating: MicrowaveHeating) {
    return this.http.put('http://localhost:5204/api/microwave/increase30seconds', microwaveHeating);
  }

  deleteHeating(id: number) {
    return this.http.delete('http://localhost:5204/api/microwave/cancel', { params: { id: id } });
  }
  pauseHeating(microwaveHeating: MicrowaveHeating) {
    return this.http.put('http://localhost:5204/api/microwave/pause', microwaveHeating);
  }
}
