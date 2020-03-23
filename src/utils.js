export const amountRounder = (amount, unit) => {
  const roundableUnits = ["ml", "g"];
  let outcome = amount;
  let i;
  for (i = 0; i < roundableUnits.length; i++) {
    if (roundableUnits[i] === unit.toLocaleLowerCase()) {
      outcome = Math.round(amount);
      break;
    }
  }
  return outcome;
};
