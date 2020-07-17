export function mark(arg) {
  switch (arg) {
    case 1: {
      return "o"
    }
    case 2: {
      return "x"
    }

    default: {
      return ""
    }
  }
}

export function sum(array) {
  return array.reduce((current, val) => current + val, 0);
}

export function remainder(val, remind) {
  return val % remind;
}

export function reminder3(val) {
  return remainder(val, 3);
}

export function isZero(value) {
  return value === 0;
}
