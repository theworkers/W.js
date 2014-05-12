function partition ( arr, length ) {
    var result = [];
    for(var i = 0; i < arr.length; i++) {
    if(i % length === 0) result.push([]);
        result[result.length - 1].push(arr[i]);
    }
    return result;
}