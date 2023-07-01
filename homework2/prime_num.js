n = process.argv[2];
function prime_numbers(n) {  
  let arr_finish = [];
  k = 1;
  while (arr_finish.length < n) {
    prime_label = true;
    for (let i=2; i<k; i++) {
      if (k % i === 0) {  
        prime_label = false;
        }
      }
    if (prime_label) {
      arr_finish.push(k);
      }
    k++;
    }
  return arr_finish;
}
console.log(prime_numbers(n))