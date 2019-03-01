import { currentlyFollowedInitiatives } from './follow-utils';

describe('currentlyFollowedInitiatives', () => {
  it('do it', () => {
    expect(currentlyFollowedInitiatives({ tags: [ 'hubInitiativeId|3eb' ]})).toEqual(['3eb']);
  });
});
