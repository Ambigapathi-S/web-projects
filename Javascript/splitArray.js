function splitArray(arr) {
  const intersection = [];
  const union = [];

  for (const element of arr) {
    if (!union.includes(element)) {
      union.push(element);
    } else if (!intersection.includes(element)) {
      intersection.push(element);
    }
  }

  return [intersection, union];
}

const originalArray = [1, 2, 2, 3, 4, 5, 4];
const [intersectionResult, unionResult] = splitArray(originalArray);

console.log("Intersection:", intersectionResult);
console.log("Union:", unionResult);
