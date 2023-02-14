# datalist = [
#     {"id": 1, "parentId": None, "children": []},
#     {"id": 2, "parentId": None, "children": []},
#     {"id": 3, "parentId": 2, "children": []},
#     {"id": 4, "parentId": 2, "children": []},
#     {"id": 5, "parentId": 3, "children": []},
#     {"id": 6, "parentId": 3, "children": []},
#     {"id": 7, "parentId": 5, "children": []},
#     {"id": 8, "parentId": None, "children": []},
#     {"id": 9, "parentId": None, "children": []},
#     {"id": 10, "parentId": None, "children": []},
#     {"id": 11, "parentId": 10, "children": []},
#     {"id": 12, "parentId": 11, "children": []},
#     {"id": 13, "parentId": None, "children": []},
#     {"id": 14, "parentId": None, "children": []},
#     {"id": 15, "parentId": 14, "children": []},
#     {"id": 16, "parentId": 15, "children": []},
#     {"id": 17, "parentId": 15, "children": []},
#     {"id": 18, "parentId": 18, "children": []},
#     {"id": 19, "parentId": None, "children": []},
#     {"id": 20, "parentId": None, "children": []},
# ]


datalist = [
{'id': 1, 'name': 'Home', 'url': 'home/', 'linkTypeId': <LinkType: Header>, 'parentId': None, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 0, 'children': []}, 

{'id': 21, 'name': 'Django AllAuth', 'url': None, 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Django>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 0, 'children': []},

 {'id': 15, 'name': 'Java', 'url': None, 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Web App Development>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 1, 'children': []},

 {'id': 20, 'name': 'Django Rest Framework', 'url': None, 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Django>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 1, 'children': []},

 {'id': 14, 'name': 'Python', 'url': None, 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Web App Development>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 3, 'children': 

 {'id': 2, 'name': 'About Us', 'url': '/aboutus', 'linkTypeId': <LinkType: Header>, 'parentId': None, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 4, 'children': []},

 {'id': 6, 'name': 'Mobile App Development', 'url': 'mobile-app-development/', 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Services>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 5, 'children': []},

 {'id': 5, 'name': 'Web App Development', 'url': 'web-app-development/', 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Services>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 6, 'children': []},

 {'id': 7, 'name': 'Hybrid App Development', 'url': 'hybrid-app-development/', 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Services>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 8, 'children': []},

 {'id': 4, 'name': 'Blog', 'url': '', 'linkTypeId': <LinkType: Header>, 'parentId': None, 'useExternalUrl': True, 'externalUrl': 'https://developers.googleblog.com/', 'openInExternalWindow': True, 'sortOrderId': 9, 'children': []},

 {'id': 3, 'name': 'Services', 'url': '/services', 'linkTypeId': <LinkType: Header>, 'parentId': None, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 10, 'children': []},

 {'id': 8, 'name': 'Contact Us', 'url': 'contactus/', 'linkTypeId': <LinkType: Footer>, 'parentId': None, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 11, 'children': []},

 {'id': 9, 'name': 'Careers', 'url': 'careers/', 'linkTypeId': <LinkType: Footer>, 'parentId': None, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 12, 'children': []},

 {'id': 10, 'name': 'Terms And Conditions', 'url': 'terms-and-conditions/', 'linkTypeId': <LinkType: Footer>, 'parentId': None, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 14, 'children': []},

 {'id': 16, 'name': 'Django', 'url': None, 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Python>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 16, 'children': []},

 {'id': 18, 'name': 'Spring Boot', 'url': None, 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Java>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 17, 'children': []},

 {'id': 19, 'name': 'Java Server Faces', 'url': None, 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Java>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 18, 'children': []},

 {'id': 17, 'name': 'Flask', 'url': None, 'linkTypeId': <LinkType: Header>, 'parentId': <LinkInfo: Python>, 'useExternalUrl': False, 'externalUrl': None, 'openInExternalWindow': False, 'sortOrderId': 19, 'children': []}]



from collections import defaultdict

def build_tree(objects):
    # Create a dictionary to store the parent-child relationships
    parent_child_map = defaultdict(list)
    print("parent_child_map:-")
    print(parent_child_map)
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
print("tree:-")
print(tree)