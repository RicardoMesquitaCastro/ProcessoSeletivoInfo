import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVeiculoModalComponent } from './add-veiculo-modal.component';

describe('AddVeiculoModalComponent', () => {
  let component: AddVeiculoModalComponent;
  let fixture: ComponentFixture<AddVeiculoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVeiculoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVeiculoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
