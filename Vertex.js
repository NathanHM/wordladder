class Vertex {

    _adjList;
    _word;
    _visited;
    _predecessor;

    constructor(word) {
        this._adjList = [];
        this._word = word;
        this._visited = false
    }

    get adjList() {
        return this._adjList;
    }

    get word() {
        return this._word;
    }

    get visited() {
        return this._visited;
    }

    get predecessor() {
        return this._predecessor;
    }

    set visited(bool) {
        this._visited = bool;
    }

    set predecessor(word) {
        this._predecessor = word;
    }

    addToAdjList(word) {
        this._adjList.push(word);
    }
}

module.exports = Vertex;