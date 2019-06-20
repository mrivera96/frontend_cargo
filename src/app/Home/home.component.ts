import {Component, OnInit} from '@angular/core';
import {CarriersService} from "../services/carriers.service";
import {HttpClient} from "@angular/common/http";
import {Carrier} from "../interfaces/carriers";
import {AppComponent} from "../app.component";


// @ts-ignore
@Component({
  selector: 'app-home', templateUrl: './home.component.html', styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  estDest: string;
  estOrg: string;
  noData:boolean=false;
  page:number=1;
  result:boolean=false;
  selected:string;
  carga: boolean = false;
  carrier:Carrier[];
  appComponent: AppComponent=new AppComponent();
  USstates:string[]=this.appComponent.USstates;


  constructor(private carriersService: CarriersService,
              httpClient: HttpClient
  ) {

  }

  filter(estDest, estOrg) {
    this.noData=false;
    this.carga=true;
    this.carriersService.get(estDest, estOrg).subscribe((data: Carrier[]) => {this.carrier=data;
    if(data.length==0){
      this.noData=true;
    }

      this.carga = false;
    this.result=true;
    }, (error) => {
      alert('Ocurrió un error');
      console.log(error);
      this.carga = false;
    });

  }



  ngOnInit() {
  }

}
