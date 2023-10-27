'use client';

import NumberSelect from '@components/sudoku/NumberSelect';
import useSudokuStore from '@store/sudoku.store';

const Sudoku = () => {
    const { board, selectNumber } = useSudokuStore();

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="grid grid-cols-9 grid-rows-9">
                {board.map((row, rowIndex) => {
                    return row.map((cell, colIndex) => {
                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={
                                    `border border-gray-500 w-16 h-16 flex justify-center items-center` +
                                    ((rowIndex + 1) % 3 === 0 ? ' border-b-red-700' : '') +
                                    (rowIndex % 3 === 0 ? ' border-t-red-700' : '') +
                                    ((colIndex + 1) % 3 === 0 ? ' border-r-red-700' : '') +
                                    (colIndex % 3 === 0 ? ' border-l-red-700' : '')
                                }>
                                <div className="text-3xl relative w-full h-full flex justify-center items-center">
                                    <div className="absolute left-0 top-0 right-0 bottom-0 z-10">
                                        <NumberSelect
                                            onNumberSelected={(selectedNumber) =>
                                                selectNumber(rowIndex, colIndex, selectedNumber)
                                            }
                                            valueList={cell.pickableNumbers.filter((v) => v.isPickable)}></NumberSelect>
                                    </div>

                                    {cell.value === 0 ? '' : cell.value}
                                </div>
                            </div>
                        );
                    });
                })}
            </div>
        </div>
    );
};

export default Sudoku;
