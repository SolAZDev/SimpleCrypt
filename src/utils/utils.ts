export function ReadFileAsB64(file: File) {
  const fReader = new FileReader();
  // fReader.readAsText
}

export function isBase64(str: string) {
  if (str === '' || str.trim() === '') {
    return false;
  }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}

export function isNullOrWhitespace(str: string) {
  if (str && str.trim().length > 0) {
    return false;
  } else {
    return true;
  }
}
