var graph = [[2, 3, 28, 26],[26, 1],[6, 1, 2, 5],[5, 2],[3, 4],[3, 4],[6, 9, 10],[5, 9, 6],[10, 8],[8, 9, 11, 7],[10, 12, 14],[10, 9, 13, 14],[12, 15, 14, 11],[11, 12, 15],[14, 13, 18],[15, 13, 18, 17],[18, 20, 15, 16],[19, 17, 15],[17, 23, 20],[19, 21, 17],[24, 22, 20],[21, 23, 27],[20, 19, 22],[23],[22, 24, 26, 27],[1, 25],[22, 28],[26, 2, 27]];
var node_values = [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0];

var graph_edges = [];
graph.forEach(function(values, idx) {
	graph_edges[idx] = [-1,-1,-1,-1];
	values.forEach(function(v, i) {
		graph_edges[idx][i] = v-1;
	});
	console.log('Graph.nodes[' + idx + '] = new graph_node({' + node_values[idx] + ",{" + graph_edges[idx].join(',') + '}});');
});

var paddles_start = [2,26,6,5,3,3,6,5,10,8,10,10,12,11,14,15,18,19,17,19,24,21,20,23,22,1,22,26];
paddles_start.forEach(function(n,idx) {
	paddles_start[idx] = n-1;
});
console.log('{' + paddles_start.join(',') + '}');

var paddles_hint = [3,26,1,2,4,3,6,5,8,7,10,9,12,11,14,13,20,19,23,21,20,21,19,23,24,25,22,27];
paddles_hint.forEach(function(n,idx) {
	paddles_hint[idx] = n-1;
});
console.log('{' + paddles_hint.join(',') + '}');
