/**
 * Tag function used to become a string into template
 *
 * @param {*} strings Positional strings
 * @param {*} keys Object with tags and values
 * @returns
 * @examples:
 * ```
 * let t1Closure = template`${0}${1}${0}!`;
 * t1Closure('Y', 'A'); // "YAY!"
 *
 * let t2Closure = template`${0} ${'foo'}!`;
 * t2Closure('Hello', {foo: 'World'}); // "Hello World!"
 *
 * let t3Closure = template`I'm ${'name'}. I'm almost ${'age'} years old.`;
 * t3Closure('foo', {name: 'MDN', age: 30}); //"I'm MDN. I'm almost 30 years old."
 * t3Closure({name: 'MDN', age: 30}); //"I'm MDN. I'm almost 30 years old."
 *
 * ```
 */
function template(strings, ...keys) {
  return function (...values) {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];
    keys.forEach(function (key, i) {
      let value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join("");
  };
}

/**
 * Returns the browser language
 *
 * @returns
 */
function getBrowserLang() {
  return navigator.language.split("-")[0].toUpperCase();
}
