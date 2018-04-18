export default function dataFormatter(value, cells) {
  if (formats.FORMULA.test(value)) {
    return parseFormulas(value, cells);
  }
  if (formats.CURRENCY.test(value)) {
    return parseCurrency(value);
  }
  if (formats.NUMBER.test(value)) {
    return parseNumber(value);
  }
  return value;
}

const formats = {
  FORMULA: /=(?:SUM|AVG|CNT|LNK)(?=\(.+\))/,
  NUMBER: /^[0-9]+(?:[.,][0-9]+)?$/,
  CURRENCY: /^[0-9]+(?:[.,][0-9]+)?\$$/,
};

function parseNumber(number) {
  return parseFloat(number.replace(',', '.')).toFixed(2);
}

function parseCurrency(number) {
  const mantisa = parseFloat(number.replace(',', '.')).toFixed(2).replace(/[0-9]+\./, '');
  console.log(mantisa);
  const basis = number
    .replace(/(\..*)?\$$/, '')
    .split('')
    .reverse()
    .reduce((a, b) => {
      if (!(a.replace(' ', '').length % 3)) {
        return `${a} ${b}`;
      }
      return `${a}${b}`;
    })
    .split('')
    .reverse()
    .join('');
  return `${basis}.${mantisa}$`;
}

function parseFormulas(expression, data) {
  const formula = expression.substring(1, 4);
  const args = expression.substring(5, expression.length - 1).replace(/ /g, '').split(',');
  console.log(formula);
  switch (formula) {
    case 'SUM': {
      let rez = 0;
      let dataType = '';
      if (formats.NUMBER.test(data.getValue(args[0]))) {
        dataType = formats.NUMBER;
      }
      else if (formats.CURRENCY.test(data.getValue(args[0]))) {
        dataType = formats.CURRENCY;
      }
      else {
        return 'Invalid Data';
      }
      args.some((arg) => {
        if (!dataType.test(data.getValue(arg))) {
          rez = null;
          return true;
        }
        rez += parseFloat(data.getValue(arg));
        return false;
      });
      if (rez !== null) {
        return dataType === formats.NUMBER ? parseNumber(rez.toString()) : parseCurrency(rez.toString());
      }
      return 'Invalid Data';
    }
    case 'AVG': {
      let rez = 0;
      let dataType = '';
      if (formats.NUMBER.test(data.getValue(args[0]))) {
        dataType = formats.NUMBER;
      }
      else if (formats.CURRENCY.test(data.getValue(args[0]))) {
        dataType = formats.CURRENCY;
      }
      else {
        return 'Invalid Data';
      }
      args.some((arg) => {
        if (!dataType.test(data.getValue(arg))) {
          rez = null;
          return true;
        }
        rez += parseFloat(data.getValue(arg));
        return false;
      });
      if (rez) {
        return dataType === formats.NUMBER ?
          parseNumber((rez / args.length).toString()) :
          parseCurrency((rez / args.length).toString());
      }
      return 'Invalid Data';
    }
    case 'CNT': {
      let rez = '';
      args.forEach((arg) => {
        rez += data.getValue(arg).toString();
      });
      return rez;
    }
    case 'LNK': {
      if (/((http|https):\/\/\w*\.\D*$)/.test(args[0])) {
        return args[0];
      }
      return 'Invalid link format';
    }
  }
}
