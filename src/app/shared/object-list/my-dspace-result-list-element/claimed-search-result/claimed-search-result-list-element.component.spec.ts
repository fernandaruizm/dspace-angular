import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of as observableOf } from 'rxjs';

import { Item } from '../../../../core/shared/item.model';
import { ClaimedSearchResultListElementComponent } from './claimed-search-result-list-element.component';
import { ClaimedTask } from '../../../../core/tasks/models/claimed-task-object.model';
import { MyDspaceItemStatusType } from '../../../object-collection/shared/mydspace-item-status/my-dspace-item-status-type';
import { WorkflowItem } from '../../../../core/submission/models/workflowitem.model';
import { createSuccessfulRemoteDataObject } from '../../../testing/utils';
import { ClaimedTaskSearchResult } from '../../../object-collection/shared/claimed-task-search-result.model';
import { TruncatableAction } from '../../../truncatable/truncatable.actions';
import { TruncatableService } from '../../../truncatable/truncatable.service';

let component: ClaimedSearchResultListElementComponent;
let fixture: ComponentFixture<ClaimedSearchResultListElementComponent>;

const compIndex = 1;

const mockResultObject: ClaimedTaskSearchResult = new ClaimedTaskSearchResult();
mockResultObject.hitHighlights = {};

const item = Object.assign(new Item(), {
  bitstreams: observableOf({}),
  metadata: {
    'dc.title': [
      {
        language: 'en_US',
        value: 'This is just another title'
      }
    ],
    'dc.type': [
      {
        language: null,
        value: 'Article'
      }
    ],
    'dc.contributor.author': [
      {
        language: 'en_US',
        value: 'Smith, Donald'
      }
    ],
    'dc.date.issued': [
      {
        language: null,
        value: '2015-06-26'
      }
    ]
  }
});
const rdItem = createSuccessfulRemoteDataObject(item);
const workflowitem = Object.assign(new WorkflowItem(), { item: observableOf(rdItem) });
const rdWorkflowitem = createSuccessfulRemoteDataObject(workflowitem);
mockResultObject.indexableObject = Object.assign(new ClaimedTask(), { workflowitem: observableOf(rdWorkflowitem) });

describe('ClaimedSearchResultListElementComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ClaimedSearchResultListElementComponent],
      providers: [
        { provide: TruncatableService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(ClaimedSearchResultListElementComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClaimedSearchResultListElementComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    component.dso = mockResultObject.indexableObject;
    fixture.detectChanges();
  });

  it('should init item properly', () => {
    expect(component.workflowitem).toEqual(workflowitem);
  });

  it('should have properly status', () => {
    expect(component.status).toEqual(MyDspaceItemStatusType.VALIDATION);
  });
});
