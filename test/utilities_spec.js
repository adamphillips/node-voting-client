import {expect} from 'chai';
import {classnameForEntry} from '../src/utilities';

describe('classnameForEntry', () => {
  it('should convert the entry to lower case', () => {
    expect(classnameForEntry('Something')).to.equal('something');
  });

  it('should convert spaces to hyphens', () => {
    expect(classnameForEntry('Some Thing')).to.equal('some-thing');
  });
});
