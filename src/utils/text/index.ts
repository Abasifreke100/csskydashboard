import { errorToast, successToast } from "../toast";

export const truncateText = (str: string, n: number) =>
    str.length > n ? `${str.trim().substring(0, n)}...` : `${str.trim()}`;
  
  export const capitalize = (s: string = "") =>
    s.length >= 1 ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  
  export const formatJoinedText = (
    str: string,
    separator: string | RegExp = "-",
  ) => {
    return str
      .split(separator)
      .map((word) => capitalize(word))
      .join(" ");
  };
  
  export const addSuffixes = (
    length: number,
    suffixes: string = "s",
    alt?: string,
  ) => (length > 1 ? suffixes : alt ?? "");
  
  export interface QueryTextProps {
    isEdit?: boolean;
    isDelete?: boolean;
  }
  
  export const successText = ({ isDelete, isEdit }: QueryTextProps) =>
    `${isDelete ? "deleted" : isEdit ? "edited" : "created"} successfully`;
  
  export const errorText = ({ isDelete, isEdit }: QueryTextProps) =>
    `Failed to ${isDelete ? "delete" : isEdit ? "edit" : "create new"}`;
  
  export const joinFirstNameAndLastName = (
    first_name?: string | null,
    last_name?: string | null,
  ) => `${returnPlaceHolderTxt(first_name)} ${returnPlaceHolderTxt(last_name)}`;
  
  export const returnPlaceHolderTxt = (
    text?: string | number | null,
    placeholder?: string,
  ) => text ?? placeholder ?? "-";

  export  const getArticle = (role: string | null) => {
    if (!role) return '';
    const vowelRegex = /^[aeiou]/i;
    return vowelRegex.test(role) ? 'an' : 'a';
  }
  
  

  export function formatTier(tier: string): string {
    if (!tier) return '';
  
    // Split the string by the hyphen
    const parts = tier.split('-');
  
    // Capitalize the first part and return it with the second part
    return parts
      .map((part, index) => (index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part))
      .join(' ');
  }
  
 
export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log(`Copied to clipboard: ${text}`);

    successToast({
      title: "Copied to Clipboard",
      message: "Text has been successfully copied to your clipboard.",
    });
  } catch (err) {
    errorToast({
      title: "Copy Failed",
      message: "Failed to copy text to clipboard. Please try again.",
    });
    console.error("Failed to copy text to clipboard:", err);
  }
};