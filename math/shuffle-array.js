// Fisher-Yates shuffle.
// *source http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling*
function  shuffleArray (arr, leaveOriginalUntouched) {
    var array = (leaveOriginalUntouched) ? arr.slice(0) : arr;
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}
