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

export {
    insertionSortSnapshot,
    bubbleSortSnapshot
}

