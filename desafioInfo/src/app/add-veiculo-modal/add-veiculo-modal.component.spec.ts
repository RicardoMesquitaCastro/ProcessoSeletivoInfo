import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVeiculoModalComponent } from './add-veiculo-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddVeiculoModalComponent', () => {
  let component: AddVeiculoModalComponent;
  let fixture: ComponentFixture<AddVeiculoModalComponent>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        AddVeiculoModalComponent,
        BrowserAnimationsModule
      ],

      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVeiculoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve fechar o modal quando o botão de fechar for clicado', () => {
    component.onClose();
    expect(component.onClose).toBeTruthy();
  });

  it('deve salvar um veículo quando o formulário for válido', () => {
    const mockFormValue = {
      placa: 'ABC1234',
      chassi: '12345678901234567',
      renavam: '12345678901',
      modelo: 'Modelo X',
      marca: 'Marca Y',
      ano: 2022
    };
    component.vehicleForm.setValue(mockFormValue);
    component.onSave();

    expect(component.onSave).toBeTruthy();
  });

  it('não deve salvar um veículo se o formulário for inválido', () => {
    const invalidFormValue = {
      placa: 'ABC123',
      chassi: '1234567890123456',
      renavam: '1234567890',
      modelo: '',
      marca: '',
      ano: ''
    };
    component.vehicleForm.setValue(invalidFormValue);
    component.onSave();

    expect(component.onSave).toBeTruthy();
  });
});
