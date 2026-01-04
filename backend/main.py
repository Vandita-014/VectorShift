from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def has_cycle(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph has a cycle using DFS.
    Returns True if cycle exists (not a DAG), False otherwise (is a DAG).
    """
    # Build adjacency list
    node_ids = {node['id'] for node in nodes}
    graph = {node_id: [] for node_id in node_ids}
    
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in graph and target in graph:
            graph[source].append(target)
    
    # DFS to detect cycles
    WHITE = 0  # Unvisited
    GRAY = 1   # Currently being processed (in recursion stack)
    BLACK = 2  # Fully processed
    
    color = {node_id: WHITE for node_id in node_ids}
    
    def dfs(node_id):
        if color[node_id] == GRAY:
            # Back edge found, cycle exists
            return True
        
        if color[node_id] == BLACK:
            # Already processed
            return False
        
        # Mark as being processed
        color[node_id] = GRAY
        
        # Visit all neighbors
        for neighbor in graph[node_id]:
            if dfs(neighbor):
                return True
        
        # Mark as fully processed
        color[node_id] = BLACK
        return False
    
    # Check all components
    for node_id in node_ids:
        if color[node_id] == WHITE:
            if dfs(node_id):
                return True
    
    return False

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    nodes = [node.dict() for node in pipeline.nodes]
    edges = [edge.dict() for edge in pipeline.edges]
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if it's a DAG (no cycles)
    is_dag = not has_cycle(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
