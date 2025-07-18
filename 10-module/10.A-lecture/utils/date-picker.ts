export const getStartDate = (): Date => {
  const today = new Date();
  today.setDate(today.getDate() + 2);
  return today;
};

export const getEndDate = (): Date => {
  const today = new Date();
  today.setDate(today.getDate() + 7);
  return today;
};

export const selectBookingDates = (): {
  startDateString: string;
  endDateString: string;
} => {
  const startDate = getStartDate();
  const endDate = getEndDate();

  const startDateString = startDate.toISOString().split('T')[0];
  const endDateString = endDate.toISOString().split('T')[0];

  return {
    startDateString,
    endDateString,
  };
};
