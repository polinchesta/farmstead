import React from "react";
import styled from "./textField.module.sass";

interface PropsType extends Omit<React.HTMLProps<HTMLInputElement>, "ref" | "as"> {
    label: string;
    error?: string;
    value: string;
	setValue?: (value: string) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
}

const TextField: React.FC<PropsType> = ({
    label,
    value,
    setValue,
    error,
    inputRef,
    ...props
}) => {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue?.(newValue);
    };

    return (
        <div className={styled.container}>
            <div className={styled.legend}>
                {label}
            </div>
            <label>
                {/* <div className={styled.hiddenLabel}>{label}</div> */}
                <input className={styled.input}
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={onChange}
                    {...props}
                />
            </label>
            {error && (
                <div className={styled.error}>
                    {error}
                </div>
            )}
        </div>
    );
}

export default TextField;