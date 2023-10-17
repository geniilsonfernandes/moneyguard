function formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
  const formatter = new Intl.NumberFormat('pt-BR', options);
  return formatter.format(number);
}

export default formatNumber;
