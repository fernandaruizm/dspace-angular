import { Item } from '../../../../core/shared/item.model';
import { of as observableOf } from 'rxjs/internal/observable/of';
import { JournalGridElementComponent } from './journal-grid-element.component';
import { createSuccessfulRemoteDataObject$ } from '../../../../shared/testing/utils';
import { PaginatedList } from '../../../../core/data/paginated-list';
import { PageInfo } from '../../../../core/shared/page-info.model';
import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TruncatePipe } from '../../../../shared/utils/truncate.pipe';
import { TruncatableService } from '../../../../shared/truncatable/truncatable.service';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockItem = Object.assign(new Item(), {
  bitstreams: createSuccessfulRemoteDataObject$(new PaginatedList(new PageInfo(), [])),
  metadata: {
    'dc.title': [
      {
        language: 'en_US',
        value: 'This is just another title'
      }
    ],
    'creativework.editor': [
      {
        language: 'en_US',
        value: 'Smith, Donald'
      }
    ],
    'creativework.publisher': [
      {
        language: 'en_US',
        value: 'A company'
      }
    ],
    'dc.description': [
      {
        language: 'en_US',
        value: 'This is the description'
      }
    ]
  }
});

describe('JournalGridElementComponent', () => {
  let comp;
  let fixture;

  const truncatableServiceStub: any = {
    isCollapsed: (id: number) => observableOf(true),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [JournalGridElementComponent, TruncatePipe],
      providers: [
        { provide: TruncatableService, useValue: truncatableServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(JournalGridElementComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JournalGridElementComponent);
    comp = fixture.componentInstance;
  }));

  describe(`when the journal is rendered`, () => {
    beforeEach(() => {
      comp.object = mockItem;
      fixture.detectChanges();
    });

    it(`should contain a JournalGridElementComponent`, () => {
      const journalGridElement = fixture.debugElement.query(By.css(`ds-journal-search-result-grid-element`));
      expect(journalGridElement).not.toBeNull();
    });
  });
});
