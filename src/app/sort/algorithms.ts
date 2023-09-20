const insertionSortSnapshot = (array: Array<number>): Array<Array<number>> => {
    let snapshot: Array<Array<number>> = [];
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

export {
    insertionSortSnapshot
}

