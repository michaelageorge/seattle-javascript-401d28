function addTheRightWay(a,b) {
  return a + b;
}

console.log(addTheRightWay(3,4));

function addTheRidiculousWay(a,b) {
  if ( b === 0 ) { return a; }
  return addTheRidiculousWay(a + 1,b - 1);  
}

O(nLog(n));

console.log(addTheRidiculousWay(3,4));