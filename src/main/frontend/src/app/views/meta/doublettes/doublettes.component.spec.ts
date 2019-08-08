import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoublettesComponent } from './doublettes.component';

describe('DoublettesComponent', () => {
  let component: DoublettesComponent;
  let fixture: ComponentFixture<DoublettesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoublettesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoublettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
