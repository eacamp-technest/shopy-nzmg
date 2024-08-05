import { RegisterOptions } from 'react-hook-form';
import { Regex } from './regexs';

export class FormRules {
  public static fullName = {
    required: {
      message: 'FullName is required',
      value: true,
    },
    pattern: {
      value: Regex.fullName,
      message: 'FullName is not valid',
    },
  } as RegisterOptions;

  public static email = {
    required: {
      message: 'Email is required',
      value: true,
    },
    pattern: {
      value: Regex.email,
      message: 'Email is not valid',
    },
  } as RegisterOptions;

  public static password = {
    required: {
      message: 'Password is required',
      value: true,
    },
    pattern: {
      value: Regex.password,
      message: 'Password is not valid',
    },
  } as RegisterOptions;

  public static cardNumber = {
    required: {
      message: 'Bank card is required',
      value: true,
    },
    pattern: {
      value: Regex.cardNumber,
      message: 'Bank card is not valid',
    },
  } as RegisterOptions;

  public static cvv = {
    required: {
      message: "cvv is required",
      value: true,
    },
    pattern: {
      value: Regex.cvv,
      message: "Invalid cvv format"
    },
  } as RegisterOptions;

  public static cardHolder = {
    required: {
      message: "Cardholder name is required",
      value: true,
    },
    pattern: {
      value: Regex.cardholderName,
      message: "Cardholder name must be alphabetic",
    },
  } as RegisterOptions;

  public static address = {
    required: {
      message: "Address is required",
      value: true,
    },
    // pattern: {
    //   value: Regex.address,
    //   message: "Address is not valid",
    // },
  } as RegisterOptions;

  public static country = {
    required: {
      message: "Country is required",
      value: true,
    },
    pattern: {
      value: Regex.country,
      message: "Country is not valid",
    },
  } as RegisterOptions;
}

