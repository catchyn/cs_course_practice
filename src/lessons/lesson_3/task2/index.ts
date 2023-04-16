import {LinkedList} from "../../../common/LinkedList";

const list2 = new LinkedList<number>();
list2.addLast(1);
list2.addLast(2);
list2.addLast(3);

for (const node of list2) {
    console.log(node?.value); // 1, 2, 3
}