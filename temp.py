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

a = {
    1: {"id": 1, "parentId": None, "children": []},
    2: {"id": 2, "parentId": None, "children": []},
    3: {"id": 3, "parentId": 2, "children": []},
    4: {"id": 4, "parentId": 2, "children": []},
    5: {"id": 5, "parentId": 3, "children": []},
    6: {"id": 6, "parentId": 3, "children": []},
    7: {"id": 7, "parentId": 5, "children": []},
    8: {"id": 8, "parentId": None, "children": []},
    9: {"id": 9, "parentId": None, "children": []},
    10: {"id": 10, "parentId": None, "children": []},
    11: {"id": 11, "parentId": 10, "children": []},
    12: {"id": 12, "parentId": 11, "children": []},
    13: {"id": 13, "parentId": None, "children": []},
    14: {"id": 14, "parentId": None, "children": []},
    15: {"id": 15, "parentId": 14, "children": []},
    16: {"id": 16, "parentId": 15, "children": []},
    17: {"id": 17, "parentId": 15, "children": []},
    18: {"id": 18, "parentId": 18, "children": []},
    19: {"id": 19, "parentId": None, "children": []},
    20: {"id": 20, "parentId": None, "children": []},
}
resultlist = []


tempdict = {}

for data in datalist:
    tempdict[data["id"]] = data

# print(tempdict)


def move_objects(lst):
    result = []
    parent_map = {}

    # Create a mapping of each object to its parent
    for item in lst:
        # if hasattr(item, 'parent'):
        if item["parentId"] is not None:
            # parent_map[item] = item.parent
            parent_map[item["parentId"]] = item["parentId"]
            
        else:
            result.append(item)

    # Move objects to their respective children list
    for item in lst:
        if item["id"] in parent_map:
            parent = parent_map[item]
            if not hasattr(parent, 'children'):
                parent.children = []
            parent.children.append(item)

    return result

res = move_objects(datalist)
print(res)

# parent = None
# while(len(datalist) != 0):

#     # Get all the objects for the current parent
#     for data in datalist:
#         if data['parentId'] == parent:
#             resultlist.append(data)

#     #  Remove the data from datalist that has been appended to resultlist
#     datalist[:] = [data for data in datalist if data['parentId'] != parent]

#     print(f"Length datalist : {len(datalist)}")
#     print(f"Length resultlist : {len(resultlist)}")
#     print(datalist)
#     print(resultlist)
#     break


# # --------------------------------------------------
# resultlist = []

# while(len(datalist) != 0):

#     if(len(resultlist) == 0):
#         parent = None
#         # Traverse the datalist and move elements with cur parent from data list to resultlist

#     else:
#         for res in resultlist:
#             parent = res["id"]
#             if(len(res["children"]) != 0):
