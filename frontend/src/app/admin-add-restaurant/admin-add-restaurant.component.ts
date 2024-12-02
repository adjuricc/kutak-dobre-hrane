import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-admin-add-restaurant',
  templateUrl: './admin-add-restaurant.component.html',
  styleUrls: ['./admin-add-restaurant.component.css']
})
export class AdminAddRestaurantComponent implements OnInit {
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  jsonData: any[] = [];
  jsonData_menu: any[] = [];

  name: string = "";
  type: string = "";
  address: string = "";
  description: string = "";
  contact_person: string = "";
  start: string = "";
  end: string = "";

  err_msg: string = "";

  constructor(private restaurants_service: RestaurantsService){}

  ngOnInit(): void {
    const canvasEl = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');

    if (context) {
      this.ctx = context;
      this.draw();
    } else {
      console.error('Unable to get 2D context');
    }
  }

  onUpload(event: any) {
    const files = event.files;
    if (files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          this.jsonData = JSON.parse(e.target.result);

          let table_cnt = 0;
          let toilet_cnt = 0;
          let kitchen_cnt = 0;

          this.err_msg = "";

          for(let i = 0; i < this.jsonData.length; i++){
            if(this.jsonData[i].type == "table")
              table_cnt++;
            else if(this.jsonData[i].type == "toilet")
              toilet_cnt++;
            else if(this.jsonData[i].type == "kitchen")
              kitchen_cnt++;
          }

          if(table_cnt >= 3 && toilet_cnt >= 1 && kitchen_cnt >= 1){
            this.draw();
          }
          else{
            this.err_msg = "Restaurant must have 3 tables, 1 toilet and 1 kitchen. ";
          }

          
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }

  }

  onUploadMenu(event: any) {
    const files = event.files;
    if (files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          this.jsonData_menu = JSON.parse(e.target.result);
          
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }

  }

  draw(): void {
    const canvasEl = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
   
    if (this.ctx) {
      if(this.jsonData){
        for(let i = 0; i < this.jsonData.length; i++){
          console.log(this.jsonData[i].params);
          this.ctx.strokeStyle = 'black';
          if(this.jsonData[i].type == "table"){
            this.ctx.beginPath();

            this.ctx.arc(this.jsonData[i].params.x, this.jsonData[i].params.y, this.jsonData[i].params.r, 0, 2 * Math.PI);

            this.ctx.stroke();
          }
          else if(this.jsonData[i].type == "toilet"){
            this.ctx.strokeRect(this.jsonData[i].params.x, this.jsonData[i].params.y, 100, 100);
          }
          else if(this.jsonData[i].type == "kitchen"){
            this.ctx.strokeRect(this.jsonData[i].params.x, this.jsonData[i].params.y, 200, 100);
          }
        }
      }
    }
    
  }

  add_restaurant(){
      if(this.name != "" && this.type != "" && this.address != "" && this.description != "" && this.contact_person != "" && this.jsonData.length > 0 && this.jsonData_menu.length > 0){
        this.restaurants_service.add_restaurant(this.name, this.type, this.address, this.description, this.contact_person, this.jsonData, this.jsonData_menu, this.start, this.end).subscribe(
          data => {
            if(data != null){
              console.log("WOO");
            }
          }
        )
      }
      else{
        this.err_msg = "All fields are mandatory. ";
      }
  }
}
