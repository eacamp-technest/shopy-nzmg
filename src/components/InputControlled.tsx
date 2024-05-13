import React from 'react'
import { IInput, Input } from './Input'
import { Controller, ControllerProps } from 'react-hook-form'

interface IInputController extends IInput, Partial<ControllerProps> {
    control?: any;
    disabledControl?: boolean;
}

export const InputControlled: React.FC<IInputController> = ({
    name,
    control,
    defaultValue,
    rules,
    disabled,
    disabledControl,
    ...inputProps
}) => {
    return (
        <Controller
            disabled={disabledControl}
            control={control}
            name={name as string}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field }) => (
                <Input
                    disabled={disabled}
                    setValue={field.onChange}
                    value={field.value}
                    onBlur={field.onBlur}
                    {...inputProps}
                />
            )}
        />
    )
}