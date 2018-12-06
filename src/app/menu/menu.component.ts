import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  menuForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private menuService: MenuService,
  ) { 
    this.menuForm = this.fb.group({
      'variaveis': ['', Validators.compose([
        Validators.pattern('^[1-9]+[0-9]*$'),
        Validators.required,
      ])],
      'restricoes': ['', Validators.compose([
        Validators.pattern('^[1-9]+[0-9]*$'),
        Validators.required,
      ])],
    });
  }

  ngOnInit() { }

  submitForm() {
    let value = this.menuForm.value;
    this.menuService.set(value.variaveis, value.restricoes);
    this.router.navigate(['params']);
  }
}
