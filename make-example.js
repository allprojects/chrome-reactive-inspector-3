function mkNode(name, type, value = "None") {
	let node = {
	    content: {
	        'nodeId': name,
	        'nodeType': type,
	        'nodeRef': name,
	        'nodeValue': value,
	        'sourceInfo': 0
	    }, action: "saveNode", destination: "panel"
	}
	chrome.runtime.sendMessage("fgfpihlifkogdbneaeioniifkipgeipn", node, function (response) { console.log(response) })
	return node
}

function mkEdge(from, to) {
	let edge = {
            content: {
                "edgeStart": from.content.nodeId,
                "edgeStartName": '',
                "edgeEnd": to.content.nodeId,
                "edgeEndName": '',
                "edgeLabel": ""
            },
            action: "saveEdge",
            destination: "panel"
        }
	chrome.runtime.sendMessage("fgfpihlifkogdbneaeioniifkipgeipn", edge, function (response) { console.log(response) })
}


let temperature = mkNode("temperature", "Evt")
let filter = mkNode("filter", "Event")
mkEdge(temperature, filter)
let filtered = mkNode("filtered", "Event")
mkEdge(filter, filtered)
let history = mkNode("history", "Signal", "Nil")
mkEdge(filtered, history)
let aggregation = mkNode("aggregation", "Var", "average")
let aggregated = mkNode("aggregated", "Signal", "0")
mkEdge(aggregation, aggregated)
mkEdge(history, aggregated)
let onDisplay = mkNode("onDisplay", "Var", "List(history, aggregated)")
let dashboard = mkNode("dashboard", "Signal", "…")
mkEdge(onDisplay, dashboard)
mkEdge(history, dashboard)
mkEdge(aggregated, dashboard)
