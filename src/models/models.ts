export interface TransformableBase {
  message: string;
}
export interface EncryptableBase {
  message: string;
  // file: string;
  password: string;
}

export interface EncryptedResult {
  data: string;
  password: string;
}

// Probably a bad idea, but gets transformed in t base64
export interface EncryptedBundle {
  content: string;
  buffer: string;
  key: string;
}

export interface DropDownSelection {
  name: string;
  id: number;
}
