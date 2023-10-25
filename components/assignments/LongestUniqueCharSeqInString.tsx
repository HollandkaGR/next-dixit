'use client';

import { Input } from '@components/ui/input';
import { ChangeEvent, useState } from 'react';

const LongestUniqueCharSeqInString = () => {
    const [result, setResult] = useState('');

    const handleInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const inputArray = event.target.value.split('');

        let currentArray: string[] = [];
        let maxArray: string[] = [];

        for (let i = 0; i < inputArray.length; i++) {
            const currentChar = inputArray[i];
            if (i === 0) {
                currentArray.push(currentChar);
            } else {
                if (currentChar === inputArray[i - 1] && currentArray.length >= maxArray.length) {
                    maxArray = [...currentArray];
                    currentArray = [currentChar];
                } else {
                    currentArray.push(currentChar);
                }
            }

            if (i === inputArray.length - 1 && currentArray.length >= maxArray.length) {
                maxArray = [...currentArray];
            }
        }

        setResult(maxArray.join(''));
    };

    return (
        <>
            <Input
                autoComplete="off"
                type="text"
                maxLength={255}
                name="stringInput"
                id="stringInput"
                defaultValue={''}
                onChange={handleInputChanged}
            />
            <div className="">
                <b className="text-red-500">Longest unique sequence in input:</b> {result}
            </div>
        </>
    );
};

export default LongestUniqueCharSeqInString;
