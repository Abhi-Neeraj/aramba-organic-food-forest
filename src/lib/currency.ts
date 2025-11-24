/**
 * Currency formatting utilities for Indian Rupees (INR)
 */

/**
 * Formats a number as Indian Rupees (INR)
 * @param amount - The amount to format
 * @returns Formatted string with INR symbol and proper formatting
 * @example
 * formatINR(1000) => "₹1,000"
 * formatINR(1000000) => "₹10,00,000"
 */
export function formatINR(amount: number | undefined | null): string {
  if (amount === null || amount === undefined) {
    return '₹0';
  }

  // Format using Indian numbering system
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
}

/**
 * Formats a price range in INR
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @returns Formatted price range string
 * @example
 * formatINRRange(100, 500) => "₹100 - ₹500"
 */
export function formatINRRange(
  minPrice: number | undefined | null,
  maxPrice: number | undefined | null
): string {
  const min = formatINR(minPrice);
  const max = formatINR(maxPrice);
  return `${min} - ${max}`;
}
