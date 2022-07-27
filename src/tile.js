class Tile {
    constructor(img, edges, idx) {
        this.img = img;
        this.edges = edges;

        this.width = img.width;
        this.height = img.height;

        this.top = [];
        this.right = [];
        this.bottom = [];
        this.left = [];

        if (idx !== undefined) { this.idx = idx; }
    }

    Adjacency(tiles) {
        function ReverseString(s) { return s.split('').reverse().join(''); }
        function CompareEdge(a,b) { return ReverseString(a) === b; }

        for (let i = 0; i < tiles.length; i++) {
            let tile = tiles[i];
            if (tile.idx == 12 && this.idx == 15) continue;
            if (tile.idx == 14 && this.idx == 15) continue;
            if (tile.idx == 12 && this.idx == 13) continue;
            if (tile.idx == 13 && this.idx == 13) continue;
            
            if (CompareEdge(this.edges[0], tile.edges[2]))
                this.top.push(i);
            if (CompareEdge(this.edges[1], tile.edges[3]))
                this.right.push(i);
            if (CompareEdge(this.edges[2], tile.edges[0]))
                this.bottom.push(i);
            if (CompareEdge(this.edges[3], tile.edges[1]))
                this.left.push(i);
        }
    }

    Rotate(num) {
        const w = this.img.width;
        const h = this.img.height;
        const newImg = createGraphics(w, h);
        newImg.imageMode(CENTER);
        newImg.translate(w / 2, h / 2);
        newImg.rotate(HALF_PI * num);
        newImg.image(this.img, 0, 0);
    
        const newEdges = [];
        const len = this.edges.length;
        for (let i = 0; i < len; i++) {
          newEdges[i] = this.edges[(i - num + len) % len];
        }
        return new Tile(newImg, newEdges, this.idx);
    }

    // CreatePatterns() {
    //     function Rotate(num) {
    //         const w = this.img.width;
    //         const h = this.img.height;
    //         const newImg = createGraphics(w, h);
    //         newImg.imageMode(CENTER);
    //         newImg.translate(w / 2, h / 2);
    //         newImg.rotate(HALF_PI * num);
    //         newImg.image(this.img, 0, 0);
        
    //         const newEdges = [];
    //         const len = this.edges.length;
    //         for (let i = 0; i < len; i++) {
    //           newEdges[i] = this.edges[(i - num + len) % len];
    //         }
    //         return new Tile(newImg, newEdges, this.index);
    //     }
    //     function Reflect() { }

    //     // Ignore until wfc is finished
    //     // Save patterns into map to remove duplicates
    //     // return uniquely generated patterns
    // }
}