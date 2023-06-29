import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaynightComponent } from './daynight.component';

describe('DaynightComponent', () => {
  let component: DaynightComponent;
  let fixture: ComponentFixture<DaynightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaynightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaynightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
