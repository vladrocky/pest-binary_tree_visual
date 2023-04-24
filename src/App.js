import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import axios from 'axios'

import 'reactflow/dist/style.css';

let initialNodes = [];
let initialEdges = [];

const baseURL = "http://localhost:8080/tree";

export default function App() {

  axios.get(baseURL).then((resp) => {

    let graph = resp.data

    if (graph !== "have`not tree") {

      let grCnt = Object.keys(graph).length

      for (let vert in graph) {
        initialNodes.push({
          id: vert, position: { x: (graph[vert].posx + grCnt) * 150, y: graph[vert].posy * 100 }, data: { label: vert }
        })
        if (graph[vert].left) {
          initialEdges.push({
            id: `e${vert}-${graph[vert].left}`, source: vert, target: graph[vert].left
          })
        }
        if (graph[vert].right) {
          initialEdges.push({
            id: `e${vert}-${graph[vert].right}`, source: vert, target: graph[vert].right
          })
        }

      }

    }
  })
  // const [nodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        // nodes={nodes}
        // edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        nodes={initialNodes}
        edges={initialEdges}
      />
    </div>
  );
}

export function InitGraph() {

  // const vertex = form.elements['vertex']


  function init() {

    let input = document.getElementById("ini").elements.vertex.value

    axios.put(baseURL, {
      val: input
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    })
  }

  return (
    <form onSubmit={init} id='ini'>
      <label>
        Введите вершину:
        <input name='vertex' type='text' />
      </label>
      <input type="submit" value="Отправить" />
    </form>
  );

}