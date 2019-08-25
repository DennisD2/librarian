import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsistencyCheckComponent } from './consistency-check.component';

describe('ConsistencyCheckComponent', () => {
  let component: ConsistencyCheckComponent;
  let fixture: ComponentFixture<ConsistencyCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsistencyCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsistencyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
