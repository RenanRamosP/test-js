type AnticipatorConfig = {
  columnSize: number;
  minToAnticipate: number;
  maxToAnticipate: number;
  anticipateCadence: number;
  defaultCadence: number;
};

type SlotCoordinate = {
  column: number;
  row: number;
};

type SpecialSymbol = { specialSymbols: Array<SlotCoordinate> };

type RoundsSymbols = {
  roundOne: SpecialSymbol;
  roundTwo: SpecialSymbol;
  roundThree: SpecialSymbol;
};

type SlotCadence = Array<number>;

type RoundsCadences = {
  roundOne: SlotCadence;
  roundTwo: SlotCadence;
  roundThree: SlotCadence;
};

const anticipatorConfig: AnticipatorConfig = {
  columnSize: 5,
  minToAnticipate: 2,
  maxToAnticipate: 3,
  anticipateCadence: 2,
  defaultCadence: 0.25,
};

const gameRounds: RoundsSymbols = {
  roundOne: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 1, row: 3 },
      { column: 3, row: 4 },
    ],
  },
  roundTwo: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 0, row: 3 },
    ],
  },
  roundThree: {
    specialSymbols: [
      { column: 4, row: 2 },
      { column: 4, row: 3 },
    ],
  },
};

const slotMachineCadences: RoundsCadences = {
  roundOne: [],
  roundTwo: [],
  roundThree: [],
};

function slotCadence(symbols: Array<SlotCoordinate>): SlotCadence {
  const {
    columnSize,
    minToAnticipate,
    maxToAnticipate,
    anticipateCadence,
    defaultCadence,
  } = anticipatorConfig;

  //create an array with the size of the columns and fill it with the default cadence
  const cadence = new Array<number>(columnSize).fill(defaultCadence);

  //iterate over the array and add the default cadence to the previous cadence
  cadence.forEach((_, index) => {
    index == 0
      ? (cadence[index] = defaultCadence)
      : (cadence[index] = cadence[index - 1] + defaultCadence);

    let specialSymbols = 0;

    //find the number of special symbols in the column
    for (const symbol of symbols) {
      if (symbol.column == index) {
        specialSymbols++;
      }
    }

    //if the number of special symbols is between the min and max to anticipate, add the anticipate cadence
    if (
      specialSymbols >= minToAnticipate &&
      specialSymbols <= maxToAnticipate
    ) {
      cadence[index] = cadence[index] + anticipateCadence;
    }
  });

  return cadence;
}

function handleCadences(rounds: RoundsSymbols): RoundsCadences {
  slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
  slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
  slotMachineCadences.roundThree = slotCadence(
    rounds.roundThree.specialSymbols
  );

  return slotMachineCadences;
}

console.log("CADENCES:", handleCadences(gameRounds));
