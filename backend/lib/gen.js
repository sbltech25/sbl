/**
 * Generate a concise, meaningful username from any name.
 * @param {string} fullName
 * @param {number} [maxLen=12]
 * @returns {string}
 */
function userNameGen(fullName, maxLen = 12) {
  const clean = fullName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z\s]/g, ' ')
    .trim();

  if (!clean) return 'user' + Math.floor(Math.random() * 1e4);

  const words = clean.split(/\s+/).filter(Boolean);
  let uname = words.length === 1
    ? words[0].toLowerCase()
    : (words[0][0] + words.at(-1)).toLowerCase();

  if (uname.length > maxLen) uname = uname.slice(0, maxLen);
  if (uname.length < 3) uname = (uname + words.join('').toLowerCase()).slice(0, 3);

  return uname;
}

function passwordGen(username, email) {
  const symbols = '!@#$%^&*?';                     // symbol pool
  const digits  = '0123456789';                   // digit pool


  const cap = (username.match(/[a-z]/i) || ['A'])[0].toUpperCase();

  const lowersPool = (username + email).toLowerCase().match(/[a-z]/g) || [];
  const pad = 'abcdefghijklmnopqrstuvwxyz';
  const lowers = Array.from({ length: 3 }, (_, i) =>
    (lowersPool[i] || pad[i])
  ).join('');

  
  const nums = Array.from({ length: 3 }, () =>
    digits[Math.floor(Math.random() * digits.length)]
  ).join('');

  
  const sym = symbols[Math.floor(Math.random() * symbols.length)];

  return cap + lowers + nums + sym;             
}




export {userNameGen, passwordGen}