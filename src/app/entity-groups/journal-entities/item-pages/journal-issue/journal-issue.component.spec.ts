import { Item } from '../../../../core/shared/item.model';
import { PaginatedList } from '../../../../core/data/paginated-list';
import { PageInfo } from '../../../../core/shared/page-info.model';
import { JournalIssueComponent } from './journal-issue.component';
import { createRelationshipsObservable, getItemPageFieldsTest } from '../../../../+item-page/simple/item-types/shared/item.component.spec';
import { createSuccessfulRemoteDataObject$ } from '../../../../shared/testing/utils';

const mockItem: Item = Object.assign(new Item(), {
  bitstreams: createSuccessfulRemoteDataObject$(new PaginatedList(new PageInfo(), [])),
  metadata: {
    'publicationissue.issueNumber': [
      {
        language: 'en_US',
        value: '1234'
      }
    ],
    'creativework.datePublished': [
      {
        language: 'en_US',
        value: '2018'
      }
    ],
    'dc.description': [
      {
        language: 'en_US',
        value: 'desc'
      }
    ],
    'creativework.keywords': [
      {
        language: 'en_US',
        value: 'keyword'
      }
    ]
  },
  relationships: createRelationshipsObservable()
});

describe('JournalIssueComponent', getItemPageFieldsTest(mockItem, JournalIssueComponent));
