class Cell {
    constructor(value) {
        this.collapsed = false;
        this.options = (value instanceof Array) ? value : Array.from(Array(value).keys());
    }
}