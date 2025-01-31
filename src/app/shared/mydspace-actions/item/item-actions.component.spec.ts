import { ChangeDetectionStrategy, Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of as observableOf } from 'rxjs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MockTranslateLoader } from '../../mocks/mock-translate-loader';
import { RouterStub } from '../../testing/router-stub';
import { Item } from '../../../core/shared/item.model';
import { ItemActionsComponent } from './item-actions.component';
import { ItemDataService } from '../../../core/data/item-data.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { NotificationsServiceStub } from '../../testing/notifications-service-stub';
import { SearchService } from '../../../+search-page/search-service/search.service';
import { RequestService } from '../../../core/data/request.service';
import { getMockSearchService } from '../../mocks/mock-search-service';
import { getMockRequestService } from '../../mocks/mock-request.service';

let component: ItemActionsComponent;
let fixture: ComponentFixture<ItemActionsComponent>;

let mockObject: Item;

const mockDataService = {};

mockObject = Object.assign(new Item(), {
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

const searchService = getMockSearchService()

const requestServce = getMockRequestService();

describe('ItemActionsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: MockTranslateLoader
          }
        })
      ],
      declarations: [ItemActionsComponent],
      providers: [
        { provide: Injector, useValue: {} },
        { provide: Router, useValue: new RouterStub() },
        { provide: ItemDataService, useValue: mockDataService },
        { provide: NotificationsService, useValue: new NotificationsServiceStub() },
        { provide: SearchService, useValue: searchService },
        { provide: RequestService, useValue: requestServce }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(ItemActionsComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemActionsComponent);
    component = fixture.componentInstance;
    component.object = mockObject;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture = null;
    component = null;
  });

  it('should init object properly', () => {
    component.object = null;
    component.initObjects(mockObject);

    expect(component.object).toEqual(mockObject);
  });

});
