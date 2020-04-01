// Получить массив всех умений всех пользователей (поле skills),
// при этом не должно быть повторяющихся умений и они должны быть
// отсортированы в алфавитном порядке.
import users from "./users.js";

const getSortedUniqueSkills = users => {
  const allSkills = users
    .map(user => user.skills)
    .reduce((total, skills) => {
      total.push(...skills);
      return total;
    }, []);
  return allSkills
    .filter((skill, idx) => allSkills.indexOf(skill) === idx)
    .sort();
};

console.log(getSortedUniqueSkills(users));
// [ 'adipisicing', 'amet', 'anim', 'commodo', 'culpa', 'elit', 'ex', 'ipsum', 'irure',
// 'laborum', 'lorem', 'mollit', 'non', 'nostrud', 'nulla', 'proident', 'tempor', 'velit', 'veniam' ]
