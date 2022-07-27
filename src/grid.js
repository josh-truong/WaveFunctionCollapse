class Grid {
    constructor(n) {
        this.n = n
        this.grid = [];
    }

    GetCell(idx) { return this.grid[idx]; }
    GetGrid() { return this.grid; }
    TranslateIdx(idx) { return { row: idx / this.n >> 0, col: idx % this.n }; }

    PopulateGrid(nTiles) {
        const n = this.n * this.n
        for (let i = 0; i < n; i++)
            this.grid[i] = new Cell(nTiles);
    }

    GetSortedUncollapsedCells() {
        try {
            let grid = this.grid.slice();
            grid = grid.filter((cell) => !cell.collapsed);
            if (grid.length == 0) return null;
            grid.sort((a, b) => { return a.options.length - b.options.length; });
            return grid;
        } catch(e) { 
            console.log("[GetSortedUncollapsedCells]", e);
            return undefined;
        }
    }

    GetTopCell(idx) {
        const { row, col } = this.TranslateIdx(idx);
        if (row > 0) {
            const idx = col + (row - 1) * this.n;
            return this.grid[idx];
        } else { return null; }
    }

    GetRightCell(idx) {
        const { row, col } = this.TranslateIdx(idx);
        if (col < this.n - 1) {
            const idx = col + 1 + row * this.n;
            return this.grid[idx];
        } else { return null; }
    }

    GetBottomCell(idx) {
        const { row, col } = this.TranslateIdx(idx);
        if (row < this.n - 1) {
            const idx = col + (row + 1) * this.n;
            return this.grid[idx];
        } else { return null; }
    }

    GetLeftCell(idx) {
        const { row, col } = this.TranslateIdx(idx);
        if (col > 0) {
            const idx = col - 1 + row * this.n;
            return this.grid[idx];
        } else { return null; }
    }
}