// reservation-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from '../model/reservation';
import { ReservationService } from '../service/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});
  selectedProductPrice: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private reservationService : ReservationService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      dataCompra: ['', Validators.required],
      endereco: ['', Validators.required],
      dataEntrega: ['', Validators.required],
      Name: ['', Validators.required],
      Produto: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Quantidade: ['', Validators.required]
    });
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      let reservation = this.reservationService.getReservation(id)

      if(reservation)
        this.reservationForm.patchValue(reservation)
    }
  }

  onSubmit() {
    if(this.reservationForm.valid){

      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        // Update
        this.reservationService.updateReservation(id, reservation)
      } else {
        // New
        this.reservationService.addReservation(reservation)   
      }

      this.router.navigate(['/list'])
    }
  }

  updatePrice(product: string) {
    switch(product) {
      case 'martelo':
        this.selectedProductPrice = 10;
        break;
      case 'prego':
        this.selectedProductPrice = 8;
        break;
      case 'areia':
        this.selectedProductPrice = 20;
        break;
      default:
        this.selectedProductPrice = 0;
    }
  }
}