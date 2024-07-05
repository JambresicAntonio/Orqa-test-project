const buildHierarchy = (employees) => {
    const map = {};
    employees.forEach(employee => {
        map[employee.id] = { ...employee, children: [], expanded: true };
    });

    const roots = [];
    employees.forEach(employee => {
        if (employee.manager_id) {
            if (map[employee.manager_id]) {
                map[employee.manager_id].children.push(map[employee.id]);
            } else {
                console.warn(`Manager ID ${employee.manager_id} not found for employee ${employee.id}`);
            }
        } else {
            roots.push(map[employee.id]);
        }
    });

    if (roots.length > 1) {
        const virtualRoot = {
            id: 'virtual-root',
            firstName: 'Virtual',
            lastName: 'Root',
            position: 'Root Position',
            email: 'root@example.com',
            children: roots,
        };
        return virtualRoot;
    }

    return roots[0];
};

export default buildHierarchy;
