import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VeiculoService } from './services/veiculo.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let veiculoServiceMock: jasmine.SpyObj<VeiculoService>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const matDialogRefStub = () => ({ close: jasmine.createSpy('close') });
    veiculoServiceMock = jasmine.createSpyObj('VeiculoService', ['getVeiculos', 'addVeiculo', 'updateVeiculo', 'deleteVeiculo']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    veiculoServiceMock.getVeiculos.and.returnValue(of([{ id: 1, placa: 'ABC-1234', chassi: '123456', renavam: '123456789', modelo: 'Modelo A', marca: 'Marca A', ano: 2020 }]));

    await TestBed.configureTestingModule({
      imports: [AppComponent, MatDialogModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: VeiculoService, useValue: veiculoServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatDialogRef, useFactory: matDialogRefStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Deve inicializar dados da API ao carregar a página', () => {
    const mockVehicles = { vehicles: [{ id: 1, placa: 'XYZ-1234', chassi: '123', renavam: '456', modelo: 'Sedan', marca: 'Toyota', ano: 2020 }] };
    veiculoServiceMock.getVeiculos.and.returnValue(of(mockVehicles));

    component.loadVehicles();

    expect(veiculoServiceMock.getVeiculos).toHaveBeenCalled();
    expect(component.vehicles).toEqual(mockVehicles.vehicles);
  });

  it('Não deve inicializar dados da API ao carregar a página (ERRO CARREGAMENTO)', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(null) });
    dialogMock.open.and.returnValue(dialogRefSpyObj);

    component.addVeiculo();

    expect(dialogMock.open).toHaveBeenCalled();
    expect(veiculoServiceMock.addVeiculo).not.toHaveBeenCalled();
  });

  it('Deve editar algum dado existente', () => {
    component.editVehicle(1);
    expect(component.editingIndex).toBe(1);
  });

  it('Deve checar se algum dado foi editado', () => {
    component.editingIndex = 2;
    expect(component.isEditing(2)).toBeTrue();
    expect(component.isEditing(1)).toBeFalse();
  });

  it('Deve deletar um dado da tabela e recarregar a pagina com os dados atualizados', () => {
    veiculoServiceMock.deleteVeiculo.and.returnValue(of({}));
    spyOn(component, 'loadVehicles');

    component.deleteVeiculo(1);

    expect(veiculoServiceMock.deleteVeiculo).toHaveBeenCalledWith(1);
    expect(component.loadVehicles).toHaveBeenCalled();
  });
});
