/**
 * Interface to map a savedGame
 * @interface savedGame
 */
interface savedGame {
  [key: string]: number;
}

/**
 * Interface to map a type for object
 * @interface objectsArray
 */
interface objectsArray {
  [key: string]: number;
}

class MainHelper {
  /**
   * Function to sort kills mode and player rank
   * @param {savedGame} savedprev
   * @param {savedGame} savednext
   * @returns {number}
   * @memberof MainHelper
   */
  sortByKeyName(savedprev: savedGame, savednext: savedGame): number {
    const objectkeyprev = Object.keys(savedprev).shift();
    const objectkeynext = Object.keys(savednext).shift();

    if (objectkeyprev && objectkeynext) {
      if (savedprev[objectkeyprev] > savednext[objectkeynext]) {
        return -1;
      }
    }
    return 0;
  }

  /**
   * Function to merge array of objects into one object
   * @param {Array<objectsArray>} objectsArray Array of objects to be merged
   * @returns {objectsArray} Array of objects merged into one
   * @memberof MainHelper
   */
  mergeObjects(objectsArray: Array<objectsArray>): objectsArray {
    const outputArray = {};

    objectsArray.forEach(object => {
      Object.assign(outputArray, object);
    });

    return outputArray;
  }
}

export default new MainHelper();
