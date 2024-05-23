import { LinkedList } from '../../../../common/LinkedList';

const list = new LinkedList<number>();

list.addLast(1);
list.addLast(2);
list.addLast(3);
list.addFirst(41);
list.addFirst(40);
list.addFirst(39);
list.removeFirst();
list.removeLast();
list.insertAfter(41, 999);
list.insertAfter(999, 888);
list.deleteKey(41);

list.display(); // 40, 999, 888, 1, 2,
