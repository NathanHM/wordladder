const Vertex = require('./Vertex');

class Graph {

    _vertices = [];
    _numVertices;

    constructor(num) {
        this._numVertices = num;
    }

    getVertex(word) {
        for (let i = 0; i < this._numVertices; i++) {
            if (this._vertices[i].word === word) {
                return this._vertices[i];
            }
        }
        return undefined;
    }

    setVertex(word) {
        const vertex = new Vertex(word);
        this._vertices.push(vertex);
    }

    bfs(beginWord, endWord) {

        for (const vertex of this._vertices) {
            vertex.visited = false;
            vertex.predecessor = undefined;
        }

        const queue = [];

        let begin = this.getVertex(beginWord);
        begin.visited = true;
        const beginList = begin.adjList;

        for (const node of beginList) {

            let vertex = this.getVertex(node);
            vertex.visited = true;
            vertex.predecessor = beginWord;

            if (vertex.word === endWord) {
                return;
            }

            queue.push(vertex);
        }

        while (queue.length !== 0) {

            const vertex = queue.shift();
            const list = vertex.adjList;

            for (const node of list) {

                const adjVertex = this.getVertex(node);

                if (!adjVertex.visited) {

                    adjVertex.visited = true;
                    adjVertex.predecessor = vertex.word;

                    if (adjVertex.word === endWord) {
                        return;
                    }

                    queue.push(adjVertex);
                }
            }
        }
    }
}

module.exports = Graph;