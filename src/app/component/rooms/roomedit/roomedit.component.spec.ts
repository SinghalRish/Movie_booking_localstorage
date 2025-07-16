import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomeditComponent } from './roomedit.component';

describe('RoomeditComponent', () => {
  let component: RoomeditComponent;
  let fixture: ComponentFixture<RoomeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomeditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
