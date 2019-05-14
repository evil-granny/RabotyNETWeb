import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Photo } from '../models/photo.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  toggled = false;

  private url = "http://localhost:8080";

  _hasBackgroundImage = true;
  menus = [
    {
      title: 'General',
      type: 'header'
    },
    {
      title: 'Vacancies',
      icon: 'fa fa-archive',
      active: false,
      url: 'vacancies'
    },
    {
      title: 'Extra',
      type: 'header'
    },
    {
      title: 'About',
      icon: 'fa fa-book',
      active: false,
      type: 'simple'
    },
  ];

  constructor(private http: HttpClient) { }

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }

}
