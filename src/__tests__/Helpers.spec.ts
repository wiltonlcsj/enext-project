import MainHelper from '@helpers/MainHelper';

describe('Tests suit for Helpers models and methods', () => {
  it('C must be before A if key-value is bigger than A', () => {
    const objectA = { name1: 3 };
    const objectB = { name2: 0 };
    const objectC = { name3: 4 };

    const result = [objectA, objectB, objectC].sort(MainHelper.sortByKeyName);

    expect(result.shift()).toHaveProperty('name3');
    expect(result.shift()).toHaveProperty('name1');
    expect(result.shift()).toHaveProperty('name2');
  });

  it('A must be after B if key-value is smaller than B', () => {
    const objectA = { name1: 1 };
    const objectB = { name2: 2 };
    const objectC = { name3: 4 };

    const result = [objectA, objectB, objectC].sort(MainHelper.sortByKeyName);

    expect(result.shift()).toHaveProperty('name3');
    expect(result.shift()).toHaveProperty('name2');
    expect(result.shift()).toHaveProperty('name1');
  });

  it('A array of objects must be merged to only one object', () => {
    const object1 = { name1: 1 };
    const object2 = { name2: 2 };

    const result = MainHelper.mergeObjects([object1, object2]);
    expect(result).toHaveProperty('name1');
    expect(result).toHaveProperty('name2');
  });
});
