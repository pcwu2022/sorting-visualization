'use client';

import React, { useEffect, useState } from 'react';

const ElementVisual = (props: {
    value: number
}) => {
    return (
        <div className={`p-2 ml-2 inline-block bg-blue-300 align-bottom`} style={{
            height: props.value*10+10,
        }}>
                {/* {props.value} */}
        </div>
    )
}

const randomArray = (array: Array<number>) => {
    for (let i = 0; i < array.length; i++){
        for (let j = 0; j < array.length; j++){
            if (Math.random() < 0.5){
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    }
    return array;
}

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

const page = () => {
    const [arr, setArr] = useState<Array<number>>([]);
    const arrLength = 30;
    let snapshot: Array<Array<number>> = [];
    let i = 0;

    useEffect(() => {
        let tempArr = [];
        for (let n = 0; n < arrLength; n++){
            tempArr.push(n);
        }
        tempArr = randomArray(tempArr);
        setArr(tempArr);
        snapshot = insertionSortSnapshot(tempArr);
        let itv = setInterval(() => {
            if (snapshot.length === 0){
                return;
            }
            setArr(snapshot[i]);
            i = i + 1;
            if (i === snapshot.length){
                clearInterval(itv);
            }
        }, 100);
    }, []);
    return (
        <div className='p-10'>
            {
                arr.map((element) => (
                    <ElementVisual key={Math.random()} value={element}/>
                ))
            }
        </div>
    )
}

export default page;
