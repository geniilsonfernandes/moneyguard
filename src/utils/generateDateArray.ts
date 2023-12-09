import dayjs from 'dayjs';

function generateDateArray(initialDate: Date, numberOfMonths: number): string[] {
  const datesArray: string[] = [];
  let currentDate = dayjs(initialDate);

  for (let i = 0; i < numberOfMonths; i++) {
    datesArray.push(currentDate.format('MM/YYYY'));
    currentDate = currentDate.add(1, 'month');
  }

  return datesArray;
}
export default generateDateArray;
