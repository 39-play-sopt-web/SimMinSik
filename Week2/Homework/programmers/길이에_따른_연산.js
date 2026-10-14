
function solution(num_list) {
    if (num_list.length >= 11) {
       return num_list.reduce((acc, num) => acc + num, 0);
    } else {
        return num_list.reduce((acc, num) => acc * num, 1);
    }

}