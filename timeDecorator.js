let f1 = ()=>{ throw new Error('error1') }
let f2 = ((a,b)=>a+b).bind(null,1,2);
let funcsArr = [f1,f2];

let timeDecor = (func) => func.bind({});

let wrap = function (arr) {
  this.time = !this.time 
    ? performance.now() 
    : this.time;

  if (performance.now() - this.time > 1000) {
      return arr[arr.length-1]()
  }

  try {
    return arr[0]();
  } catch (err) {
    return wrap(arr.slice(1));
  }
}
wrap = timeDecor(wrap);


console.log(wrap(funcsArr));
