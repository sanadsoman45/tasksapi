import { Component } from '@angular/core';
import { LoaderService } from '../../../core/Services/loaderService';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class Loader {

  constructor(public loader: LoaderService){

  }
}
