import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of as observableOf } from 'rxjs';

import { Item } from '../../../../core/shared/item.model';
import { WorkspaceItemSearchResultListElementComponent } from './workspace-item-search-result-list-element.component';
import { WorkspaceItem } from '../../../../core/submission/models/workspaceitem.model';
import { MyDspaceItemStatusType } from '../../../object-collection/shared/mydspace-item-status/my-dspace-item-status-type';
import { createSuccessfulRemoteDataObject } from '../../../testing/utils';
import { WorkflowItemSearchResult } from '../../../object-collection/shared/workflow-item-search-result.model';
import { TruncatableService } from '../../../truncatable/truncatable.service';

let component: WorkspaceItemSearchResultListElementComponent;
let fixture: ComponentFixture<WorkspaceItemSearchResultListElementComponent>;

const compIndex = 1;

const mockResultObject: WorkflowItemSearchResult = new WorkflowItemSearchResult();
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
const rd = createSuccessfulRemoteDataObject(item);
mockResultObject.indexableObject = Object.assign(new WorkspaceItem(), { item: observableOf(rd) });

describe('WorkspaceItemSearchResultListElementComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [WorkspaceItemSearchResultListElementComponent],
      providers: [
        { provide: TruncatableService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(WorkspaceItemSearchResultListElementComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WorkspaceItemSearchResultListElementComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    component.dso = mockResultObject.indexableObject;
    fixture.detectChanges();
  });

  it('should init item properly', () => {
    expect(component.item).toEqual(item);
  });

  it('should have properly status', () => {
    expect(component.status).toEqual(MyDspaceItemStatusType.WORKSPACE);
  });
});
