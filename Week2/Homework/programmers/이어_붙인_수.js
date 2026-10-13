function solution(num_list) {
    const odd = num_list.filter(num => num % 2 !==0);
    const even = num_list.filter(num => num % 2 === 0);

    const oddNumber = Number(odd.join(''));
    const evenNumber = Number(even.join(''));

    return oddNumber + evenNumber;
}
