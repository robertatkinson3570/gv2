import _ from 'lodash';

// modified from https://www.cs.cmu.edu/~biglou/resources/bad-words.txt
import filteredWordList from '../../shared_code/data/banned-words.json';

const cache: { [str: string]: string } = {};

export interface FilterdWordList {
  filterStrMemorized: (string) => string | undefined;
}

const filterStrMemorized = (str: string): string | undefined => {
  // We cache the result of filtering the str because it's somewhat expensive
  if (cache[str]) {
    return cache[str];
  }
  if (!str) return;

  // The user might have two swear words in the str so
  // Even if we find one swear word we keep searching and replacing
  let replacement = filteredWordList.reduce((acc, next) => {
    const containsSwear =
      next.length < 4 ? acc.startsWith(`${next} `) || acc.endsWith(` ${next}`) || acc.includes(` ${next} `) : acc.includes(next);
    if (containsSwear) {
      return acc.replace(
        next,
        next
          .split('')
          .map(() => '*')
          .join(''),
      );
    }
    return acc;
  }, str.toLowerCase());

  // Restore the case from the original string for non censored words
  replacement = _.map(replacement.split(''), function (letter, index) {
    return letter === '*' ? letter : str[index];
  }).join('');
  cache[str] = replacement;
  return replacement;
};

const FilterdWords: FilterdWordList = {
  filterStrMemorized,
};

export default FilterdWords;
