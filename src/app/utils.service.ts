import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
