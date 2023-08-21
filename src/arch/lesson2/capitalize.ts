// eslint-disable-next-line
interface String {
  capitalize(this: string): string;
}

String.prototype.capitalize = function (this: string): string {
  if (!this.length) {
    return this;
  }
  return this.charAt(0).toUpperCase() + this.slice(1);
};

console.log('foo'.capitalize());
