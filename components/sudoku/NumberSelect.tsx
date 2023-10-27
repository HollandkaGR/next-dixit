import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export type PickableNumber = {
    displayValue: string;
    value: number;
    isPickable: boolean;
};

type NumberSelectProps = {
    selectedNumber?: number | null;
    valueList: PickableNumber[];
    onNumberSelected: (value: number) => void;
};

const NumberSelect = ({ valueList, selectedNumber, onNumberSelected }: NumberSelectProps) => {
    const handleNumberSelected = (value: number) => {
        onNumberSelected(value);
    };
    if (selectedNumber && !isNaN(selectedNumber)) {
        handleNumberSelected(selectedNumber);
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={
                        `w-full h-full ` + (valueList.map((v) => v.isPickable).length === 0 ? 'bg-red-500' : '')
                    }></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800">
                {(valueList || []).map((number, index) => {
                    return (
                        <DropdownMenuItem
                            onSelect={() => handleNumberSelected(number.value)}
                            key={index}
                            className="px-3 text-base hover:text-red-700 border-amber-600 text-center">
                            {number.displayValue}
                        </DropdownMenuItem>
                    );
                })}
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NumberSelect;
