export default function getMaxDomainValue(number: number) {
  if (number > 1000) return 1200;
  if (number > 400 && number <= 1000) return 1000;
  if (number > 100 && number <= 400) return 400;
  if (number > 48 && number <= 100) return 100;
  if (number > 12 && number <= 48) return 48;
  if (number > 4 && number <= 12) return 12;
  if (number <= 4) return 4;
}
