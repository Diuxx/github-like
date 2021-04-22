/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SnippetNewFileComponent } from './snippet-new-file.component';

describe('SnippetNewFileComponent', () => {
  let component: SnippetNewFileComponent;
  let fixture: ComponentFixture<SnippetNewFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnippetNewFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetNewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
