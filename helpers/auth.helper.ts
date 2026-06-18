import { toast } from 'react-toastify';
import Router from 'next/router';
export const oauthLink = process.env.OAUTH_LINK;

export const postAuthUnlink = async (code: string | string[]): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/discord/unlink`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
      method: 'POST',
    });
    const responseData = await response.json();
    const errorMessage = responseData?.error?.message;
    const successMessage = responseData?.message;
    const link = responseData?.link;
    if (errorMessage) {
      toast.warn(errorMessage, {
        theme: 'dark',
        autoClose: false,
        closeButton: true,
      });
    } else if (successMessage) {
      toast.info(successMessage, {
        theme: 'dark',
        autoClose: false,
        closeButton: true,
        onClose: !link ? null : async () => await Router.push(link),
      });
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const postAuthValidation = async (address: string, code: string | string[]): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/discord/validate`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, code }),
      method: 'POST',
    });
    const responseData = await response.json();
    const errorMessage = responseData?.error?.message;
    const successMessage = responseData?.message;
    const link = responseData?.link;
    if (errorMessage) {
      toast.warn(errorMessage, {
        theme: 'dark',
        autoClose: false,
        closeButton: true,
      });
    } else if (successMessage) {
      toast.info(successMessage, {
        theme: 'dark',
        autoClose: false,
        closeButton: true,
        onClose: !link ? null : async () => await Router.push(link),
      });
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getIsValidated = async (address: string): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/discord/isvalidated?address=${address}`);
    const data = response.status === 200 && (await response.json());
    return Boolean(data);
  } catch (err) {
    return false;
  }
};
