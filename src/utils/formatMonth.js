const MONTH_FORMATTER = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatMonth(value) {
  if (!value) return 'Present';
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  if (!match) return value;
  return MONTH_FORMATTER.format(new Date(`${value}-01T00:00:00Z`));
}
