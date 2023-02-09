class Node:
    def __init__(self, item, parentId=None, children=None):
        self.item = item
        self.parent = parentId
        self.children = children or []

    def __str__(self):
        return str(self.item)

def construct_tree(lst):
    node_map = {}

    for item in lst:
        node = Node(item)
        node_map[item['id']] = node

    for item in lst:
        node = node_map[item['id']]
        parent_id = item.get('parentId')
        if parent_id:
            parent = node_map.get(parent_id)
            if parent:
                parent.children.append(node)
                node.parent = parent

    # Find the root node(s) with no parent
    root_nodes = [node for node in node_map.values() if node.parent is None]

    return root_nodes
