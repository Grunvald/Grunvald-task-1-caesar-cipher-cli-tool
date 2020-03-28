const ranges = [
  {
    name: 'AZ',
    min: 65,
    max: 90,
    regexp: /[A-Z]/,
  },
  {
    name: 'az',
    min: 97,
    max: 122,
    regexp: /[a-z]/,
  },
];

const checkLimits = (num, range) => (num - range.min) % (range.max - range.min) + range.min;

module.exports = encryption = (input, shift) => [...input].map(el => ranges.reduce((res, range) => {
    let result = '';
    if (range.regexp.test(el)) {
      result = checkLimits(el.charCodeAt(0) + shift, range);
    } else {
      result = res || el.charCodeAt(0);
    }
    return result;
  }, ''))
  .map(el => String.fromCharCode(el))
  .join('');


