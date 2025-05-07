export function isWithinNormalRange(value: number, normalRange: string): boolean | null {
    const match = normalRange.match(/^(\d+(?:[.,]\d+)?)\s*[\u2013\u2014\-]\s*(\d+(?:[.,]\d+)?)/);
    if (!match) return null;
  
    const min = parseFloat(match[1].replace(',', '.'));
    const max = parseFloat(match[2].replace(',', '.'));
  
    return value >= min && value <= max;
  }
  