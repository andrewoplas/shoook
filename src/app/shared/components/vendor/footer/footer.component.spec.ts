import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFooterComponent } from '@shared/vendor/footer/footer.component';

describe('VendorFooterComponent', () => {
  let component: VendorFooterComponent;
  let fixture: ComponentFixture<VendorFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
