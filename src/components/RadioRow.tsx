import { twJoin, twMerge } from 'tailwind-merge'

type UlProps = React.HTMLAttributes<HTMLUListElement>

export type RadioItemProps<T> = {
    id: number | string
    label: string
    value: T
}

type RadioGroupProps<T> = Omit<UlProps, 'onChange'> & {
    items: RadioItemProps<T>[]
    activeId: number | string
    onChange?: (item: RadioItemProps<T>, index: number) => unknown
}

export default function RadioGroup<T>({
    items,
    activeId: activeId,
    className,
    onChange,
}: RadioGroupProps<T>) {
    const radioGroupId = [...items.map(({ label }) => label)].sort().join('')

    return (
        <ul
            className={twJoin(
                'flex flex-wrap justify-center gap-x-2 gap-y-1',
                className
            )}
        >
            {items.map((item, i) => (
                <li
                    key={`${radioGroupId}-${item.id}`}
                    className={twMerge(
                        'inline-block cursor-pointer rounded border-2 border-transparent',
                        'transition-colors duration-200',
                        'hover:border-blue-500 dark:hover:border-violet-500',
                        'has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white',
                        'has-[:checked]:dark:border-violet-500 has-[:checked]:dark:bg-violet-500 has-[:checked]:dark:text-black',
                        className
                    )}
                >
                    <label
                        htmlFor={`${radioGroupId}-${i}`}
                        className={'inline-block cursor-pointer px-3 py-[1px]'}
                    >
                        {item.label}
                    </label>
                    <input
                        type="radio"
                        className="hidden"
                        id={`${radioGroupId}-${i}`}
                        name={radioGroupId}
                        onChange={() => onChange?.(item, i)}
                        checked={activeId === item.id}
                    />
                </li>
            ))}
        </ul>
    )
}
