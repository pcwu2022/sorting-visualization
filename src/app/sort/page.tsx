'use client';

import React, { useEffect, useState } from 'react';

import {
    insertionSortSnapshot
} from './algorithms';

const ChooseButton = (props: {
    children: string | JSX.Element | null,
    onClick: () => void
}) => {
    return (<>
        <div
            className='inline-block bg-blue-500 m-4 p-4 hover:bg-blue-600 active:bg-blue-700 cursor-pointer'
            onClick={props.onClick}
        >
            {props.children}
        </div>
    </>)
}

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

const page = () => {
    const [arr, setArr] = useState<Array<number>>([]);
    const arrLength = 30;
    let snapshot: Array<Array<number>> = [];
    let i = 0;

    const refresh = () => {
        let tempArr = [];
        for (let n = 0; n < arrLength; n++){
            tempArr.push(n);
        }
        tempArr = randomArray(tempArr);
        setArr(tempArr);
    }
    useEffect(() => {
        refresh();
    }, []);

    const sortAnimation = (sortingAlgorithm: (inputArray: Array<number>) => Array<Array<number>>) => {
        snapshot = sortingAlgorithm(arr);
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
    }
    return (
        <div>
            <div className='p-10'>
                <ChooseButton
                    onClick={() => {
                        sortAnimation(insertionSortSnapshot)
                    }}
                >Insertion Sort</ChooseButton>
            </div>
            <div className='p-10'>
                {
                    arr.map((element) => (
                        <ElementVisual key={Math.random()} value={element}/>
                    ))
                }
            </div>
        </div>
    )
}

export default page;
