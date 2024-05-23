// eslint-disable-next-line
interface String {
  capitalize(this: string): string;
}

String.prototype.capitalize = function (this: string): string {
  if (!this.length) {
    return this;
  }
  const chunks = [...this];
  return chunks[0].toUpperCase() + chunks.slice(1).join('');
};

console.log('foo'.capitalize());
