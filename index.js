// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
const str = ` 'Здравствуйте' - сказал он мне.
'До свидания' - ответил я`;

const regexp = /'/gmi;

const str2 = str.replace(regexp, '"');
console.log(str2)

// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

const regexp2 = /'(?=\W|$)|(?<=\W|^)'/g;
const str3 = ` 'Здравствуйте' - сказал он мне.
Но в голове я услышал - '.... aren't ...' и ужаснулся`;

const str4 = str3.replace(regexp2, '"');
console.log(str4)