import { RegisterOptions } from "react-hook-form";
import { Regexs } from './regexs'

export class FormRules {
    public static email = {
        required: {
            message: 'Email is Required!',
            value: true
        },
        pattern: {
            value: Regexs.email,
            message: "Email is not valid"
        },
    } as RegisterOptions;

    public static password = {
        required: {
            message: 'Password is Required!',
            value: true
        },
        pattern: {
            value: Regexs.password,
            message: "Password is not valid"
        },
    } as RegisterOptions;
}