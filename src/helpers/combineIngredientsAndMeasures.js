const combineIngredientsAndMeasures = (instructions) => {
  // Extraindo os ingredientes nas chaves que incluem strIngredient;
  const ingredients = Object.keys(instructions[0])
    .filter((key) => key.includes('strIngredient'))
    .reduce(
      (obj, key) => Object.assign(obj, {
        [key]: instructions[0][key],
      }),
      {},
    );

  // Extraindo as medidas nas chaves que incluem strMeasure;
  const measures = Object.keys(instructions[0])
    .filter((key) => key.includes('strMeasure'))
    .reduce(
      (obj, key) => Object.assign(obj, {
        [key]: instructions[0][key],
      }),
      {},
    );

  const measuresArray = Object.values(measures);

  const combinedValues = Object.values(ingredients)
    .map(
      (ingredient, index) => `${ingredient} ${!measuresArray[index]
        ? ''
        : measuresArray[index]}`,
    )
    .filter(
      (combination) => combination !== '  '
        && combination !== ' '
        && !combination.includes(null),
    );
  return combinedValues;
};

export default combineIngredientsAndMeasures;
