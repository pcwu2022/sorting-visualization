type Arr = Array<number>;
type Snapshot = Array<Array<number>>;

const insertionSortSnapshot = (array: Arr): Snapshot => {
    let snapshot: Snapshot = [];
    for (let i = 1; i < array.length; i++){
        for (let j = i; j > 0; j--){
            if (array[j] < array[j-1]){
                let temp:number = array[j];
                array[j] = array[j-1];
                array[j-1] = temp;
                snapshot.push([...array]);
            }
        }
    }
    return snapshot;
}

const bubbleSortSnapshot = (array: Arr): Snapshot => {
    let snapshot: Snapshot = [];
    for (let i = 0; i < array.length; i++){
        for (let j = 1; j < array.length - i; j++){
            if (array[j] < array[j-1]){
                let temp = array[j];
                array[j] = array[j-1];
                array[j-1] = temp;
                snapshot.push([...array]);
            }
        }
    }
    return snapshot;
}

const selectionSortSnapshot = (array: Arr): Snapshot => {
    let snapshot: Snapshot = [];
    for (let i = 0; i < array.length; i++){
        for (let j = array.length - i - 1; j >= 0; j--){
            let index = array.length - i - 1;
            if (array[index] < array[j]){
                let temp = array[index];
                array[index] = array[j];
                array[j] = temp;
                snapshot.push([...array]);
            }
        }
    }
    return snapshot;
}

const maxHeapify = (array: Arr, i: number, l:number, snapshot: Snapshot): Snapshot => {
    if (i*2 + 1 >= l){
        return snapshot;
    }
    let largest: number = i;
    if (array[i] < array[i*2+1]){
        largest = i*2+1; 
    }
    if (i*2 + 2 < l){
        if (array[i*2+2] > array[largest]){
            largest = i*2+2;
        }
    }
    if (largest === i){
        return snapshot;
    }
    let temp = array[largest];
    array[largest] = array[i];
    array[i] = temp;
    snapshot.push([...array]);
    snapshot = maxHeapify(array, largest, l, snapshot);
    return snapshot;
}

const heapExtract = (array: Arr, l: number, snapshot: Snapshot): Snapshot => {
    let temp = array[0];
    array[0] = array[l-1];
    array[l-1] = temp;
    snapshot.push([...array]);
    snapshot = maxHeapify(array, 0, l-1, snapshot);
    return snapshot;
}

const heapSortSnapshot = (array: Arr): Snapshot => {
    let snapshot: Snapshot = [];
    // maxHeapify
    for (let i = Math.floor(array.length/2)-1; i >= 0; i--){
        snapshot = maxHeapify(array, i, array.length, snapshot);
    }
    console.log(array);
    for (let i = 0; i < array.length; i++){
        snapshot = heapExtract(array, array.length - i, snapshot);
    }
    return snapshot;
}

const merge = (array: Arr, p: number, q: number, snapshot: Snapshot): [Arr, Snapshot] => {
    console.log(p, q);
    if (q - p <= 1){
        return [array, snapshot];
    }
    let mid = Math.floor((q+p)/2);
    [array, snapshot] = merge(array, p, mid, snapshot);
    [array, snapshot] = merge(array, mid, q, snapshot);
    let l = p;
    let r = mid;
    let newArray = [...array];
    for (let i = p; i < q; i++){
        if (l === mid){
            newArray[i] = array[r];
            r += 1;
        } else if (r === q){
            newArray[i] = array[l];
            l += 1;
        } else {
            if (array[l] < array[r]){
                newArray[i] = array[l];
                l += 1;
            } else {
                newArray[i] = array[r];
                r += 1;
            }
        }
        snapshot.push([...newArray]);
    }
    array = newArray;
    return [array, snapshot];
}

const mergeSortSnapshot = (array: Arr): Snapshot => {
    let snapshot: Snapshot = [];
    [array, snapshot] = merge(array, 0, array.length, snapshot);
    return snapshot;
}

const partition = (array: Arr, p: number, q: number, snapshot: Snapshot): [Arr, Snapshot] => {
    if (q - p <= 1){
        return [array, snapshot];
    }
    let j = p;
    let x = array[q-1];
    for (let i = p; i < q; i++){
        if (array[i] <= x){
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            j++;
            snapshot.push([...array]);
        }
    }
    if (j === q){
        q = q - 1;
        j = p;
    }
    snapshot.push([...array]);
    
    [array, snapshot] = partition(array, p, j-1, snapshot);
    [array, snapshot] = partition(array, j, q, snapshot);
    return [array, snapshot];
}

const quickSortSnapshot = (array: Arr): Snapshot => {
    let snapshot: Snapshot = [];
    [array, snapshot] = partition(array, 0, array.length, snapshot);
    return snapshot;
}

const stalinSortSnapshot = (array: Arr): Snapshot => {
    let snapshot: Snapshot = [];
    for (let i = 1; i < array.length; i++){
        if (array[i] < array[i-1]){
            array.splice(i, 1);
            snapshot.push([...array]);
            i--;
        }
    }
    return snapshot;
}

const stableStalinSortSnapshot = (array: Arr): Snapshot => {
    let snapshot: Snapshot = [];
    let sorted = false;
    while (!sorted){
        sorted = true;
        for (let i = 1; i < array.length; i++){
            if (array[i] < array[i-1]){
                let insert = array.splice(i, 1)[0];
                array.unshift(insert);
                snapshot.push([...array]);
                i--;
                sorted = false;
            }
        }
    }
    return snapshot;
}

const bogoSort = (array: Arr): Snapshot => {
    let snapshot: Snapshot = [];
    let sorted = false;
    while (!sorted){
        for (let i = 1; i < array.length; i++){
            if (array[i] < array[i-1]){
                sorted = false;
                break;
            }
        }
        for (let i = 0; i < array.length; i++){
            let randomA = Math.floor(Math.random()*array.length);
            let randomB = Math.floor(Math.random()*array.length);
            let temp = array[randomA];
            array[randomA] = array[randomB];
            array[randomB] = temp;
        }
    }
    return snapshot;
}

export {
    insertionSortSnapshot,
    bubbleSortSnapshot,
    selectionSortSnapshot,
    heapSortSnapshot,
    mergeSortSnapshot,
    quickSortSnapshot,
    stalinSortSnapshot,
    stableStalinSortSnapshot
}

