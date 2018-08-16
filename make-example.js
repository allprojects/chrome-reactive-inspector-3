function mkNode(name, type, value = "None") {
    let node = {
        content: {
            'nodeId': name,
            'nodeType': type,
            'nodeRef': name,
            'nodeValue': value,
            'sourceInfo': 0
        },
        action: "saveNode",
        destination: "panel"
    }
    chrome.runtime.sendMessage("llgljhhckhgbadnnjbaninnndngdfioe", node, function (response) { console.log(response) })
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
    chrome.runtime.sendMessage("llgljhhckhgbadnnjbaninnndngdfioe", edge, function (response) { console.log(response) })
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

//mkNode("temperature", "Evt", "10")
//mkNode("filter", "Event", "10")
//mkNode("filtered", "Event", "10")
//mkNode("history", "Signal", "List(10)")
//mkNode("aggregated", "Signal", "10")
//mkNode("dashboard", "Signal", "...")
//mkNode("temperature", "Evt", "None")
//mkNode("filter", "Event", "None")
//mkNode("filtered", "Event", "None")

//mkNode("temperature", "Evt", "1000")
//mkNode("temperature", "Evt", "None")

//mkNode("temperature", "Evt", "-100")
//mkNode("filter", "Event", "-100")
//mkNode("temperature", "Evt", "None")
//mkNode("filter", "Event", "None")

//mkNode("temperature", "Evt", "20")
//mkNode("filter", "Event", "20")
//mkNode("filtered", "Event", "20")
//mkNode("history", "Signal", "List(10, 20)")
//mkNode("aggregated", "Signal", "15")
//mkNode("dashboard", "Signal", "...")
//mkNode("temperature", "Evt", "None")
//mkNode("filter", "Event", "None")
//mkNode("filtered", "Event", "None")

