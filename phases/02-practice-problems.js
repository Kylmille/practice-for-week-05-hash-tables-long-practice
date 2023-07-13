function anagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false; // If the lengths are different, they cannot be anagrams
  }

  const charCount = {};

  for (let char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
    // Count the occurrences of each character in str1
  }

  for (let char of str2) {
    if (!charCount[char]) {
      return false;
      // If a character in str2 is not present in str1, they cannot be anagrams
    }
    charCount[char]--;
     // Decrement the count for each character in str2
  }

  return true;
  // If all characters match, they are anagrams
}

function commonElements(arr1, arr2) {
  const set1 = new Set(arr1);
  //Create a new Set set1 using the elements from arr1
  const set2 = new Set(arr2);
  //Create a new Set set2 using the elements from arr2
  const result = [];
  //Create an empty array result to store the common elements between arr1 and arr2.

  for (let num of set2) {
    if (set1.has(num)) {
      result.push(num);
      // Find common elements between arr1 and arr2 using sets
      // for each number num in set2:
    // if num exists in set1:
    // add num to the result array
     }
  }

  return result;
  //Return the result array, which contains the common elements between arr1 and arr2.
}

function duplicate(arr) {
  const numCount = {};

  for (let num of arr) {
    if (numCount[num]) {
      return num;
      // If a number is already present in numCount, it is a duplicate
    }
    numCount[num] = true;
    // Mark the number as seen
  }

  return null;
  // If no duplicates are found
}

function twoSum(nums, target) {
  const numMap = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap[complement] !== undefined) {
      return true;
      // If the complement is already present in numMap, a pair with the sum equal to target exists
    }
    numMap[nums[i]] = i;
    // Store the number and its index in numMap
  }

  return false;
  // If no such pair is found
}

function wordPattern(pattern, strings) {
  if (pattern.length !== strings.length) {
    return false;
    // If the lengths are different, they cannot match the pattern
  }

  const charMap = {};
  const wordMap = {};

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = strings[i];

    if (!charMap[char] && !wordMap[word]) {
      charMap[char] = word;
       // Map the character to the word
      wordMap[word] = char;
      // Map the word to the character
    } else if (charMap[char] !== word || wordMap[word] !== char) {
      return false;
       // If the mapping doesn't match the pattern, return false
    }
  }

  return true;
  // If the pattern matches all the words
}

module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
