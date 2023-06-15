
class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    const index = this.hashMod(key);

  if (!this.data[index]) {
    this.data[index] = new KeyValuePair(key, value);
    this.count++;
  } else {
    let currentNode = this.data[index];

    while (currentNode) {
      if (currentNode.key === key) {
        currentNode.value = value;
        return;
      }

      if (!currentNode.next) {
        currentNode.next = new KeyValuePair(key, value);
        this.count++;
        return;
      }

      currentNode = currentNode.next;
    }
  }

  if (this.count / this.capacity > 0.7) {
    this.resize();
  }
  }

  read(key) {
    const index = this.hashMod(key);

  if (!this.data[index]) {
    return undefined;
  }

  let currentNode = this.data[index];

  while (currentNode) {
    if (currentNode.key === key) {
      return currentNode.value;
    }
    currentNode = currentNode.next;
  }

  return undefined;
  }

  resize() {
    const oldData = this.data;
    const oldCapacity = this.capacity;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    for (let i = 0; i < oldCapacity; i++) {
      let currentNode = oldData[i];

      while (currentNode) {
        this.insert(currentNode.key, currentNode.value);
        currentNode = currentNode.next;
      }
    }
  }

  delete(key) {
    const index = this.hashMod(key);

    if (!this.data[index]) {
      return "Key not found";
    }

    let currentNode = this.data[index];

    if (currentNode.key === key) {
      this.data[index] = currentNode.next;
      this.count--;
      return;
    }

    while (currentNode.next) {
      if (currentNode.next.key === key) {
        currentNode.next = currentNode.next.next;
        this.count--;
        return;
      }
      currentNode = currentNode.next;
    }

    return "Key not found";
  }
}
module.exports = HashTable;
