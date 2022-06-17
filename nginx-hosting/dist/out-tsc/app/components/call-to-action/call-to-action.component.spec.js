import { TestBed } from '@angular/core/testing';
import { CallToActionComponent } from './call-to-action.component';
describe('CallToActionComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CallToActionComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CallToActionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=call-to-action.component.spec.js.map