import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { ActivatedRoute } from '@angular/router';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        data: {
          title: 'Oops! Page not found',
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 404 title from route data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.error-title');
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toContain('Oops! Page not found');
  });

  it('should display default error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const messageElement = compiled.querySelector('.error-message p');
    expect(messageElement).toBeTruthy();
    expect(messageElement?.textContent).toContain(
      "Sorry, the page you're looking for doesn't exist."
    );
  });
});
