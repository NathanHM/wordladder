const fs = require('fs');
const readline = require('readline');
const Graph = require('./Graph');

async function main() {

    const start = Date.now();

    const inputFileName = process.argv[2];
    const word1 = process.argv[3];
    const word2 = process.argv[4];

    const filestream = fs.createReadStream(inputFileName);
    const rl = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity
    })

    const dictionay = new Map();
    const invDict = new Map();
    const words = [];

    for await (const line of rl) {

        const trimmedLine = line.trim()
        words.push(trimmedLine)
        const intermediateWords = [];

        for (let i = 0; i < trimmedLine.length; i++) {

            const intermediate = trimmedLine.substring(0, i) + '*' + trimmedLine.substring(i + 1);
            intermediateWords.push(intermediate);
            let adjacentWords = [];

            if (dictionay.has(intermediate)) {
                adjacentWords = dictionay.get(intermediate);
            }

            adjacentWords.push(trimmedLine);
            dictionay.set(intermediate, adjacentWords);
        }

        invDict.set(trimmedLine, intermediateWords);
    }

    const graph = new Graph(words.length);

    for (const word of words) {

        graph.setVertex(word);
        const vertex = graph.getVertex(word);
        const intermediateWords = invDict.get(word);

        for (const intermediate of intermediateWords) {

            const adjacentWords = dictionay.get(intermediate);

            for (const adjacent of adjacentWords) {
                if (!vertex.adjList.includes(adjacent) && adjacent !== word) {
                    vertex.addToAdjList(adjacent);
                }
            }
        }
    }

    graph.bfs(word1, word2);

    const endVertex = graph.getVertex(word2);

    if (endVertex.predecessor === undefined) {
        console.log('No valid chain.');
    } else {

        const ladder = [];
        let vertex = graph.getVertex(endVertex.predecessor);
        ladder.push(vertex.word);

        while (vertex.predecessor !== undefined) {

            vertex = graph.getVertex(vertex.predecessor);
            ladder.push(vertex.word);
        }

        ladder.reverse();
        console.log(`Path Length: ${ladder.length}`);
        console.log('-----');

        for (const word of ladder) {

            console.log(word);
            console.log('---->');
        }

        console.log(word2);
    }

    const end = Date.now();

    console.log('-----')
    console.log(`Elapsed time: ${(end - start) / 1000} seconds`)

}

main()