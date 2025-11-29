/**
 * Currency formatting utilities for Indian Rupees (INR)
 */

/**
 * Money type from Wix ecom - represents a monetary value with amount and currency
 */
type Money = {
  amount?: string | number;
  value?: string | number;
  formattedAmount?: string;
};

/**
 * Formats a number or Money object as Indian Rupees (INR)
 * @param amount - The amount to format (number, Money object, or null/undefined)
 * @returns Formatted string with INR symbol and proper formatting
 * @example
 * formatINR(1000) => "₹1,000"
 * formatINR(1000000) => "₹10,00,000"
 * formatINR({ amount: 1000 }) => "₹1,000"
 */
export function formatINR(amount: number | Money | undefined | null): string {
  if (amount === null || amount === undefined) {
    return '₹0';
  }

  // Handle Money object type
  let numericAmount: number;
  if (typeof amount === 'object') {
    // Try to extract numeric value from Money object
    const value = amount.amount ?? amount.value;
    if (value === undefined || value === null) {
      return '₹0';
    }
    numericAmount = typeof value === 'string' ? parseFloat(value) : value;
  } else {
    numericAmount = amount;
  }

  // Format using Indian numbering system
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(numericAmount);
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
