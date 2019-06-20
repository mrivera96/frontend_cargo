import {Component, OnInit} from '@angular/core';
import {CarriersService} from "../services/carriers.service";
import {ActivatedRoute} from "@angular/router";
import {Carrier} from "../interfaces/carriers";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  id: any;
  appComponent: AppComponent = new AppComponent();
  USstates: string[] = this.appComponent.USstates;
  title: string;
  editing: boolean = false;
  carriers: Carrier[];
  carrier: Carrier = {
    Order_ID: null,
    Vehicle: null,
    O_City: null,
    O_State: null,
    O_ZIP: null,
    D_City: null,
    D_State: null,
    D_ZIP: null,
    Carrier: null,
    Based: null,
    Phone1: null,
    Phone2: null,
    email: null,
    Ins_Expcode_ci: null,
    ID: null,
    Last_Action: null,
    Deposit: null,
    Tariff: null,
    Carrier_Pay: null,
    Notes: null
  };

  constructor(private carrierService: CarriersService, private activatedRoute: ActivatedRoute) {

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {

      this.editing = true;
      this.title="Editar Ruta";
      this.carrierService.show(this.id).subscribe((data: Carrier[]) => {
        this.carriers = data;
        this.carrier = this.carriers.find((m) => {
          return m.Order_ID == this.id
        });
      }, (error) => {

      })
    } else {
      this.editing = false;
      this.title="Crear nueva ruta";
    }
  }

  ngOnInit() {
  }

  save() {
    if (this.editing) {
      this.carrierService.put(this.carrier).subscribe((data) => {
        alert("Ruta actualizada con éxito");
        window.location.replace("/home");
      }, (error) => {
        alert("Ocurrió un error");
      })
    } else {
      this.carrierService.save(this.carrier).subscribe((data)=>{
        alert("ruta creada con éxito");
        window.location.replace("/home");
      },(error)=>{
        alert("Ocurrió un error");
      })
    }
  }

}
