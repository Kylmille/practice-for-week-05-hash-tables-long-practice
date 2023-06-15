function anagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const charCount = {};

  for (let char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (let char of str2) {
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }

  return true;
}

function commonElements(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const result = [];

  for (let num of set2) {
    if (set1.has(num)) {
      result.push(num);
    }
  }

  return result;
}

function duplicate(arr) {
  const numCount = {};

  for (let num of arr) {
    if (numCount[num]) {
      return num;
    }
    numCount[num] = true;
  }

  return null;
}

function twoSum(nums, target) {
  const numMap = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap[complement] !== undefined) {
      return true;
    }
    numMap[nums[i]] = i;
  }

  return false;
}

function wordPattern(pattern, strings) {
  if (pattern.length !== strings.length) {
    return false;
  }

  const charMap = {};
  const wordMap = {};

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = strings[i];

    if (!charMap[char] && !wordMap[word]) {
      charMap[char] = word;
      wordMap[word] = char;
    } else if (charMap[char] !== word || wordMap[word] !== char) {
      return false;
    }
  }

  return true;
}

module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
