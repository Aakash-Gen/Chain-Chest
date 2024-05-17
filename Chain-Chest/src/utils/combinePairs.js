export function combinePairs(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i += 2) {
        if (i + 1 < arr.length) {
            result.push(arr[i] + arr[i + 1]);
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}