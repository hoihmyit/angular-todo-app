import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute, provideRouter, RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { importProvidersFrom } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: any;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        importProvidersFrom(
          MatToolbarModule,
          MatButtonModule,
          MatButtonToggleModule
        ),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'Todo List' title`, () => {
    expect(app.title).toEqual('Todo List');
  });

  it('should render title inside a span', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('Todo List');
  });

  it('should render Add New button with routerLink="/add"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const addButton = compiled.querySelector('button[color="primary"]');
    expect(addButton?.getAttribute('ng-reflect-router-link')).toBe('/add');
    expect(addButton?.textContent).toContain('Add New');
  });

  it('should render router-outlet', () => {
    fixture.detectChanges();
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });

  it('should render filter buttons (All, Active, Completed)', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('.filter-group button');

    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toContain('All');
    expect(buttons[0].getAttribute('ng-reflect-router-link')).toBe('/list');

    expect(buttons[1].textContent).toContain('Active');
    expect(buttons[1].getAttribute('ng-reflect-router-link')).toBe('/active');

    expect(buttons[2].textContent).toContain('Completed');
    expect(buttons[2].getAttribute('ng-reflect-router-link')).toBe('/completed');
  });
});
