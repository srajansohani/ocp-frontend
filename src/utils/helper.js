
export const arraysEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);

export const checkSubset = (arr1,arr2)=>{
  arr1.sort()
  arr2.sort()
  let i = 0;
  arr2.forEach((tag)=>{
    if(tag === arr1[i]){
      i++;
    }
  })
  if(i === arr1.length){
    return true;
  }
  return false;
}