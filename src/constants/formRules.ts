import { RegisterOptions } from 'react-hook-form';
import { Regex } from './regexs';

export class FormRules {
  public static fullName = {
    required: {
      message: 'FullName is required',
      value: true,
    },
    pattern: {
      value: Regex.email,
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

  // public static cardDate = {
  //   required: {
  //     message: "Expiration date and cvv are required",
  //     value: true,
  //   },
  //   pattern: {
  //     value: Regex.cardDate,
  //     message: "Invalid format. Use MM/YY/ CVV format"
  //   },
  // } as RegisterOptions;
  public static cvv = {
    required: {
      message: "cvv is required",
      value: true,
    },
    pattern: {
      value: Regex.cvv,
      message: "Invalid format"
    },
  } as RegisterOptions;

  public static cardHolder = {
    required: "Cardholder name is required",
    pattern: {
      value: Regex.cardholderName,
      message: "Cardholder name must be alphabetic",
    },
    maxLength: {
      value: 50,
      message: 'Cardholder name must be exceed 50 characters'
    }
  } as RegisterOptions;
}
