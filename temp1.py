datalist = [
    {"id": 1, "parentId": None, "children": []},
    {"id": 2, "parentId": None, "children": []},
    {"id": 3, "parentId": 2, "children": []},
    {"id": 4, "parentId": 2, "children": []},
    {"id": 5, "parentId": 3, "children": []},
    {"id": 6, "parentId": 3, "children": []},
    {"id": 7, "parentId": 5, "children": []},
    {"id": 8, "parentId": None, "children": []},
    {"id": 9, "parentId": None, "children": []},
    {"id": 10, "parentId": None, "children": []},
    {"id": 11, "parentId": 10, "children": []},
    {"id": 12, "parentId": 11, "children": []},
    {"id": 13, "parentId": None, "children": []},
    {"id": 14, "parentId": None, "children": []},
    {"id": 15, "parentId": 14, "children": []},
    {"id": 16, "parentId": 15, "children": []},
    {"id": 17, "parentId": 15, "children": []},
    {"id": 18, "parentId": 18, "children": []},
    {"id": 19, "parentId": None, "children": []},
    {"id": 20, "parentId": None, "children": []},
]


from collections import defaultdict

def build_tree(objects):
    # Create a dictionary to store the parent-child relationships
    parent_child_map = defaultdict(list)
    for obj in objects:
        parent_child_map[obj['parentId']].append(obj)
    # Recursively traverse the dictionary to build the tree
    def build_branch(parent_id):
        branch = []
        for child in parent_child_map.get(parent_id, []):
            branch.append({
                'id': child['id'],
                'children': build_branch(child['id'])
            })
        return branch
    # Return the tree rooted at the parent with id None
    return build_branch(None)



tree = build_tree(datalist)
print(tree)