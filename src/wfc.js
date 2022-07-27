class WFC {
    constructor(N) {
        this.N = N;
        this.grid;
        this.tiles = [];
        this.nCollapsed = 0
    }

    AddTile(img, edges) {
        let nElements = 0;
        const map = {};
        const idx = this.tiles.length;
        const tile = new Tile(img, edges, idx);

        for (let i = 0; i < 4; i++) {
            // Generate patterns
            let rotatedTile = tile.Rotate(i);
            const key = rotatedTile.edges.join(',');
            if (map[key] === undefined) {
                rotatedTile.idx += nElements++;
                map[key] = rotatedTile;
            }
        }
        this.tiles = this.tiles.concat(Object.values(map));
    }

    Run() {
        // Generate Adjacency rules for each tile
        for (const tile of this.tiles)
            tile.Adjacency(this.tiles);

        // Create a grid and populate each cell with all possible tile indexes
        const grid = new Grid(this.N);
        grid.PopulateGrid(this.tiles.length);
        this.grid = grid;
    }

    ReRun() { this.nCollapsed = 0; this.grid.PopulateGrid(this.tiles.length); }

    StepAnimate() {
        if (this.nCollapsed == this.N * this.N) return;
        this._Observe();
        this._Propagate();
    }

    _Observe() {
        function FindLowestEntropy(grid) {
            /* Constraint solving
                The heuristic of selecting the most constrained variable
                or equivalently the variable with minimum remaining values (MRV)
            */
            const options = grid.GetSortedUncollapsedCells();
            const lowestEntropy = options.filter(cell => options[0].options.length == cell.options.length);
            return lowestEntropy;
        }

        const lowestEntropyCells = FindLowestEntropy(this.grid);

        const cell = random(lowestEntropyCells);
        const state = random(cell.options); // A cell with one valid pattern has 0 entropy
        if (state === undefined) throw new Error("[Contradiction] Cell with no valid patterns.");

        this.nCollapsed += 1;
        cell.collapsed = true;
        cell.options = [state];
    }

    _Propagate() {
        // function Recurse() {}
        function Reduce(arr, options) { return arr.filter(x => options.indexOf(x) !== -1); }

        const n = this.N
        for (let i = 0; i < n * n; i++) {
            if (!this.grid.GetCell(i).collapsed) {
                let options = Array.from(Array(this.tiles.length).keys());
                // Grid Cell options
                const topCell = this.grid.GetTopCell(i);
                const rightCell = this.grid.GetRightCell(i);
                const bottomCell = this.grid.GetBottomCell(i);
                const leftCell = this.grid.GetLeftCell(i);

                if (topCell !== null) {
                    const validOptions = topCell.options
                        .map((option) => { return this.tiles[option].bottom; })
                        .reduce((a, b) => { return a.concat(b); }, []);
                    options = Reduce(options, validOptions);
                }

                if (rightCell !== null) {
                    const validOptions = rightCell.options
                        .map((option) => { return this.tiles[option].left; })
                        .reduce((a, b) => { return a.concat(b); }, []);
                    options = Reduce(options, validOptions);
                }

                if (bottomCell !== null) {
                    const validOptions = bottomCell.options
                        .map((option) => { return this.tiles[option].top; })
                        .reduce((a, b) => { return a.concat(b); }, []);
                    options = Reduce(options, validOptions);

                }

                if (leftCell !== null) {
                    const validOptions = leftCell.options
                        .map((option) => { return this.tiles[option].right; })
                        .reduce((a, b) => { return a.concat(b); }, []);
                    options = Reduce(options, validOptions);
                }
                this.grid.grid[i] = new Cell(options);
            }
        }
    }
}