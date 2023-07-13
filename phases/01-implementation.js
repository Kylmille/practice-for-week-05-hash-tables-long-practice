
class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(numBuckets = 8) {
    this.count = 0; // Initialize the count of key-value pairs
    this.capacity = numBuckets; // Set the initial capacity of the hash table
    this.data = new Array(numBuckets).fill(null); // Create an array to store the key-value pairs
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i); // Calculate the hash value based on the character codes of the key
    }

    return hashValue;
  }

  hashMod(key) {
    return this.hash(key) % this.capacity; // Get the index of the bucket where the key-value pair should be stored
  }

  insert(key, value) {
    if(this.count / this.capacity > 0.7) {
      this.resize()
    }
  let index = this.hashMod(key);
    let current = this.data[index]

      while(current) {
        if (current.key === key) {
          break;
        }
        current = current.next
      }
      if (current) {
        current.value = value
      } else {
        const keyVal = new KeyValuePair(key, value);
        keyVal.next = this.data[index];
        this.data[index] = keyVal
        this.count++;
      }
    return this.count;
  }

  //

  read(key) {
    const index = this.hashMod(key);
     // Get the index where the key-value pair should be located
    let current = this.data[index]; // Start from the first key-value pair in the bucket

    while (current) {
      // Traverse the linked list in the bucket
      if (current.key === key) {
        return current.value; // Return the value if the key is found
      }
      current = current.next;
    }

    return undefined; // Return undefined if the key is not found
  }

  resize() {
    const oldData = this.data;
    const oldCapacity = this.capacity;
    this.capacity *= 2;
    this.count = 0;
    this.data = new Array(this.capacity).fill(null);

    for (let i = 0; i < oldCapacity; i++) {
      let current = oldData[i];

      while (current) {
        const next = current.next;
        this.insert(current.key, current.value);
        current = next;
      }
    }
  }

  delete(key) {
    const index = this.hashMod(key);
    // Get the index where the key-value pair should be located
    let current = this.data[index];
    // Start from the first key-value pair in the bucket
    let prev = null;

    while (current) {
      // Traverse the linked list in the bucket
      if (current.key === key) {
        // If the key is found
        if (prev) {
          // If there is a previous key-value pair
          prev.next = current.next;
          // Update the next reference of the previous key-value pair
        } else {
          this.data[index] = current.next;
          // If the key-value pair is the first in the bucket, update the bucket reference
        }
        this.count--; // Decrease the count of key-value pairs
        return; // Exit the delete method
      }

      prev = current;
      current = current.next;
    }

    return "Key not found"; // Return a string if the key is not found
  }
}

module.exports = HashTable;
