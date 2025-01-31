import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { ItemSearchResult } from '../../../../../shared/object-collection/shared/item-search-result.model';
import { ProjectSearchResultListElementComponent } from './project-search-result-list-element.component';
import { Item } from '../../../../../core/shared/item.model';
import { TruncatePipe } from '../../../../../shared/utils/truncate.pipe';
import { TruncatableService } from '../../../../../shared/truncatable/truncatable.service';

let projectListElementComponent: ProjectSearchResultListElementComponent;
let fixture: ComponentFixture<ProjectSearchResultListElementComponent>;

const mockItemWithMetadata: ItemSearchResult = Object.assign(
  new ItemSearchResult(),
  {
    indexableObject: Object.assign(new Item(), {
      bitstreams: observableOf({}),
      metadata: {
        'dc.title': [
          {
            language: 'en_US',
            value: 'This is just another title'
          }
        ],
        // 'project.identifier.status': [
        //   {
        //     language: 'en_US',
        //     value: 'A status about the project'
        //   }
        // ]
      }
    })
  });

const mockItemWithoutMetadata: ItemSearchResult = Object.assign(
  new ItemSearchResult(),
  {
    indexableObject: Object.assign(new Item(), {
      bitstreams: observableOf({}),
      metadata: {
        'dc.title': [
          {
            language: 'en_US',
            value: 'This is just another title'
          }
        ]
      }
    })
  });

describe('ProjectSearchResultListElementComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectSearchResultListElementComponent, TruncatePipe],
      providers: [
        { provide: TruncatableService, useValue: {} }
      ],

      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(ProjectSearchResultListElementComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProjectSearchResultListElementComponent);
    projectListElementComponent = fixture.componentInstance;

  }));

  // describe('When the item has a status', () => {
  //   beforeEach(() => {
  //     projectListElementComponent.item = mockItemWithMetadata;
  //     fixture.detectChanges();
  //   });
  //
  //   it('should show the status span', () => {
  //     const statusField = fixture.debugElement.query(By.css('span.item-list-status'));
  //     expect(statusField).not.toBeNull();
  //   });
  // });
  //
  // describe('When the item has no status', () => {
  //   beforeEach(() => {
  //     projectListElementComponent.item = mockItemWithoutMetadata;
  //     fixture.detectChanges();
  //   });
  //
  //   it('should not show the status span', () => {
  //     const statusField = fixture.debugElement.query(By.css('span.item-list-status'));
  //     expect(statusField).toBeNull();
  //   });
  // });
});
