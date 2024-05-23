/**
 * Функция принимает массив перегрузок и применяет нужную.
 * @param fns массив функций.
 */
function overload(fns: ((...args: any[]) => any)[]) {
  return function (...initArgs: any[]) {
    if (!fns.length) {
      throw new Error("Add at least one function for the 'overload' function to work correctly.");
    }
    for (const current of fns) {
      if (current.length === initArgs.length) {
        return current(...initArgs);
      }
    }
    throw new Error(
      `Add function with ${initArgs.length} for the 'overload' function to work correctly`,
    );
  };
}

export { overload };
