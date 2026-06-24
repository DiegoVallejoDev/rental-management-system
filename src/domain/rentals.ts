import type { Equipment, Rental } from "../types";

const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;

function startOfLocalDay(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

export function calculateRentalDuration(
  rentalType: Rental["rentalType"],
  startDate: string,
  returnDate: string
): number {
  const start = new Date(startDate);
  const end = new Date(returnDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return 0;
  }

  if (rentalType === "Hour") {
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / MS_PER_HOUR));
  }

  const startDay = startOfLocalDay(start).getTime();
  const endDay = startOfLocalDay(end).getTime();

  return Math.max(1, Math.floor((endDay - startDay) / MS_PER_DAY) + 1);
}

export function calculateRentalTotal(
  items: { equipment: Equipment; quantity: number }[],
  rentalType: Rental["rentalType"],
  startDate: string,
  returnDate: string
): number {
  const duration = calculateRentalDuration(rentalType, startDate, returnDate);

  return items.reduce((total, item) => {
    const price =
      rentalType === "Hour" ? item.equipment.pricePerHour : item.equipment.pricePerDay;
    return total + price * item.quantity * duration;
  }, 0);
}
