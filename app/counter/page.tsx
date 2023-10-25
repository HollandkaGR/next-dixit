'use client';

import { ConfirmDialog } from '@components/ConfirmDialog';
import { Button } from '@components/ui/button';
import useStore from '@store/test';

const Counter = () => {
    const counter = useStore((state) => state.counter);
    const increment = useStore((state) => state.increment);
    const increase = useStore((state) => state.increase);

    const incrementByOne = () => {
        increment();
    };

    const increaseByFive = () => {
        increase(5);
    };

    return (
        <div className="flex flex-col items-center gap-5">
            <div>Hello</div>
            <div>Counter: {counter}</div>
            <Button
                onClick={incrementByOne}
                variant={'secondary'}>
                Increment by 1
            </Button>
            <Button
                onClick={increaseByFive}
                variant={'destructive'}>
                Increment by 5
            </Button>
            <ConfirmDialog />
        </div>
    );
};

export default Counter;
