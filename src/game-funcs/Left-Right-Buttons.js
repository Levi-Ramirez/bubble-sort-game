//import { waitFor } from "@testing-library/dom";




function swap(arr, firstIndex, secIndex) {
  let tempEl = arr[firstIndex];
  arr[firstIndex] = arr[secIndex];
  arr[secIndex] = tempEl;
}

export function moveLeft(index, array) {
  if (index != 0) {
    /*    var left = array[index - 1];
        array[index - 1] = array[index];
        array[index] = left;*/
    swap(array, index, index - 1);

    return array;
  }
  return array;
}

export function moveRight(index, array) {
  if (index != array.length - 1) {
    /*
    var right = array[index + 1];
    array[index + 1] = array[index];
    array[index] = right;*/

    swap(array, index, index + 1);
    return array;
  }
  return array;
}

export function bubbleSort(array) {
  let myBool = true; //will turn false if there were no sorts
  while (myBool) {
    myBool = false;
    for (let i = 0; i <= (array.length - 2); i++) { // -2 because length is 1 based and we will check the first and then the element after, so arr.length is 2 longer than needed
      if (array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        myBool = true;
      }
    }
  }
  return array;
}


function partition(arr, left, right) {
  let pivot = right;
  left--;
  while (left < right) {
    do {
      ++left;
    } while (arr[left] < arr[pivot]);

    do {
      --right;
    } while (arr[right] >= arr[pivot]);

    if (left < right) {
      swap(arr, left, right);
    }
  }

  swap(arr, left, pivot);
  return left;
}

export function quickSort(arr, low, high) {
  if (low < high) {

    // sorted element's index
    let sortedIndex = partition(arr, low, high);

    // Separately sort elements before
    // partition and after partition
    quickSort(arr, low, sortedIndex - 1);
    quickSort(arr, sortedIndex + 1, high);
  }
}


function merge(arr, left, mid, right) {
  var leftArrSize = mid - left + 1;
  var rightArrSize = right - mid;

  var leftArr = new Array(leftArrSize);
  var rightArr = new Array(leftArrSize); //temp arrs

  //data copy loops
  for (let i = 0; i < leftArrSize; i++) {
    leftArr[i] = arr[left + i];
  }
  for (let j = 0; j < rightArrSize; j++) {
    rightArr[j] = arr[mid + 1 + j];
  }

  // leftArr index
  let i = 0
  // rightArr index
  let j = 0;
  // index of the elements we are working on in the original array (arr)
  var k = left;

  while (i < leftArrSize && j < rightArrSize) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    }
    else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements in leftArr/rightArr (if any)
  while (i < leftArrSize) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }
  while (j < rightArrSize) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}
export function mergeSort(arr, leftBeg, rightEnd) {
  if (leftBeg >= rightEnd) {
    return;
  }
  var mid = parseInt((rightEnd - leftBeg) / 2) + leftBeg; //parseInt(--) converts string/decimal to a 'int'
  //breaks up left recursively
  mergeSort(arr, leftBeg, mid);
  //breaks up right recursively
  mergeSort(arr, mid + 1, rightEnd);
  merge(arr, leftBeg, mid, rightEnd);
}





export default { moveLeft, moveRight, bubbleSort, mergeSort, quickSort };