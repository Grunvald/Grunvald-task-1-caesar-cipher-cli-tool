const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const path = require('path');
const encryption = require('./encryption');

const requiredKeys = [
  'shift',
  'action',
  'inputFile'
];

const parseArgs = (arg) => ({
  shift: arg['s'] || arg['shift'],
  inputFile: arg['i'] || arg['input'],
  outputFile: arg['o'] || arg['output'],
  action: arg['a'] || arg['action'],
});

const init = () => {
  let input, result;
  const args = parseArgs(argv);
  const emptyKeys = Object.keys(args).filter(el => {
    if (el === 'action') return args[el] !== 'encode' && args[el] !== 'decode';
    return !args[el]
  });
  if (requiredKeys.some(el => emptyKeys.includes(el))){
    return console.error(`Не указаны обязательные параметры: (${emptyKeys.filter(el => requiredKeys.includes(el)).join(',')}) #%d`, 400);
  }
  try {
    input = fs.readFileSync(path.resolve(__dirname, args.inputFile), 'utf8');
  } catch (err) {
    console.error(`Ошибка: ${err.errno}. Файл: ${err.path} не найден.`);
    return
  }
  result = encryption(input, args.action === 'encode' ? args.shift : -args.shift);
  try {
    if (args.outputFile) {
      fs.writeFileSync(path.resolve(__dirname, args.outputFile), result);
      console.log('Результыты записаны в файл...');
    } else {
      console.log(result);
    }
  } catch (err) {
    console.error(err);
  }
};

init(argv);
