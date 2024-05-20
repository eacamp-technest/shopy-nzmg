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
    required: "Card number is required",
    minLength: {
      value: 16,
      message: "Card number must be at least 16 digits"
    },
    maxLength: {
      value: 16,
      message: "Card number must be at most 16 digits"
    },
    pattern: {
      value: Regex.cardNumber,
      message: "Card Number must be 16 numeric digits"
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

  public static cardDate = {
    required: "Expiration date is required",
    pattern: {
      value: Regex.cardDate,
      message: "Expiration date must be in MM/YY format"
    }
  }
}
