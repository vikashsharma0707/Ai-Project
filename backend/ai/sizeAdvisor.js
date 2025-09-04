export const suggestSize = ({ height = 170, weight = 70, preference = 'regular' }) => {
  const hM = Number(height) / 100;
  const bmi = Number(weight) / (hM * hM || 1);
  let size = 'M';
  if (bmi < 19) size = 'S';
  else if (bmi < 23) size = 'M';
  else if (bmi < 27) size = 'L';
  else if (bmi < 31) size = 'XL';
  else size = 'XXL';
  if (preference === 'slim' && size !== 'S') size = ['S', 'M', 'L', 'XL', 'XXL'][Math.max(0, ['S', 'M', 'L', 'XL', 'XXL'].indexOf(size) - 1)];
  if (preference === 'oversized' && size !== 'XXL') size = ['S', 'M', 'L', 'XL', 'XXL'][Math.min(4, ['S', 'M', 'L', 'XL', 'XXL'].indexOf(size) + 1)];
  return { size, bmi: Number(bmi.toFixed(1)) };
};
