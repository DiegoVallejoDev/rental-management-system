// Helper function to replace placeholders in translations
export function formatTranslation(
  text: string,
  replacements: Record<string, string | number>
): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return replacements[key]?.toString() || match;
  });
}
