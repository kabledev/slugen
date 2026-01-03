export interface SlugenOptions {
  locale?: string | string[];
  separator?: string; // default "-"
  lowercase?: boolean;
  symbols?: boolean;
  customReplacements?: Record<string, string>;
}
