'use client';

import { PickableNumber } from '@components/sudoku/NumberSelect';
import { create } from 'zustand';

type Cell = {
    value: number;
    pickableNumbers: PickableNumber[];
};
type Board = Cell[][];

interface SudokuState {
    board: Board;
    countOfMoves: number;
    errors: string[];
    selectNumber: (row: number, col: number, val: number) => void;
}

const defaultSelectableNumbers: PickableNumber[] = [
    { displayValue: '-', value: 0, isPickable: false },
    { displayValue: '1', value: 1, isPickable: true },
    { displayValue: '2', value: 2, isPickable: true },
    { displayValue: '3', value: 3, isPickable: true },
    { displayValue: '4', value: 4, isPickable: true },
    { displayValue: '5', value: 5, isPickable: true },
    { displayValue: '6', value: 6, isPickable: true },
    { displayValue: '7', value: 7, isPickable: true },
    { displayValue: '8', value: 8, isPickable: true },
    { displayValue: '9', value: 9, isPickable: true },
];

const generateBoard = (): Board => {
    const board: Board = [];
    for (let i = 0; i < 9; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < 9; j++) {
            row.push({ value: 0, pickableNumbers: [...defaultSelectableNumbers.map((o) => ({ ...o }))] });
        }
        board.push(row);
    }
    return board;
};

const initialBoard: Board = generateBoard();

const useSudokuStore = create<SudokuState>()((set) => ({
    board: initialBoard,
    countOfMoves: 0,
    errors: [],
    selectNumber: (row: number, col: number, val: number) =>
        set((state) => {
            // TODO: check if the move is valid
            const board = state.board;
            const cell = board[row][col];
            // The value doesn't change
            if (cell.value === val) {
                return state;
            }
            // The value is 0, which means the user wants to clear the cell
            if (val === 0) {
                cell.pickableNumbers[0].isPickable = false;
                setCellOnBoard(board, row, col, val);
                return { ...state, board };
            }
            // Check if the number is valid
            if (!cell.pickableNumbers[val].isPickable) {
                return state;
            }
            cell.pickableNumbers[0].isPickable = true;
            setCellOnBoard(board, row, col, val);
            return { ...state, board, countOfMoves: state.countOfMoves + 1 };
        }),
}));

const setCellOnBoard = (board: Board, row: number, col: number, newVal: number): Board => {
    const recalculatedBoard = calculateSelectableNumbers(board, row, col, newVal);
    board[row][col].value = newVal;
    return recalculatedBoard;
};

const calculateSelectableNumbers = (board: Board, row: number, col: number, newVal: number): Board => {
    setCurrentSectionsCellsPickableNumbers(board, row, col, newVal);
    setRowPickableNumbers(board, row, col, newVal);
    setColumnPickableNumbers(board, row, col, newVal);
    return board;
};

const setRowPickableNumbers = (board: Board, row: number, col: number, newVal: number): Board => {
    const cell = board[row][col];
    for (let i = 0; i < 9; i++) {
        handlePickableNumbers(board, cell, row, i, newVal);
    }
    return board;
};

const setColumnPickableNumbers = (board: Board, row: number, col: number, newVal: number): Board => {
    const cell = board[row][col];
    for (let i = 0; i < 9; i++) {
        handlePickableNumbers(board, cell, i, col, newVal);
    }
    return board;
};

const setCurrentSectionsCellsPickableNumbers = (board: Board, row: number, col: number, newVal: number): Board => {
    const cell = board[row][col];
    const rowStart = Math.floor(row / 3) * 3;
    const colStart = Math.floor(col / 3) * 3;
    for (let i = rowStart; i < rowStart + 3; i++) {
        for (let j = colStart; j < colStart + 3; j++) {
            handlePickableNumbers(board, cell, i, j, newVal);
        }
    }
    return board;
};

const handlePickableNumbers = (board: Board, cell: Cell, row: number, col: number, newVal: number): void => {
    if (newVal != 0) board[row][col].pickableNumbers[newVal].isPickable = false;
    if (cell.value !== 0) {
        board[row][col].pickableNumbers[cell.value].isPickable = true;
    }
};

export default useSudokuStore;
