export const readCSV = (
  file: File,
  isPreviousAssignments: boolean = false
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
      const data = lines.map((line) =>
        line.split(",").map((item) => item.trim())
      );

      let parsedData: any[];

      if (isPreviousAssignments) {
        parsedData = data
          .slice(1)
          .map((item) => ({
            name: item[0],
            email: item[1],
            childName: item[2],
            childEmail: item[3],
          }))
          .filter((item) => item.name && item.email);
      } else {
        parsedData = data
          .slice(1)
          .map((item) => ({
            name: item[0],
            email: item[1],
          }))
          .filter((item) => item.name && item.email);
      }

      resolve(parsedData);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file, "UTF-8");
  });
};

export const assignChildren = (
  employees: any[],
  previousAssignments: any[]
): any[] => {
  const assignments: any[] = [];

  employees.forEach((employee) => {
    let assignedChild;
    let previousAssignment = previousAssignments.find(
      (item) => item.email === employee.email
    );

    do {
      assignedChild = employees[Math.floor(Math.random() * employees.length)];
    } while (
      assignedChild.email === employee.email ||
      (previousAssignment &&
        previousAssignment.childEmail === assignedChild.email)
    );

    assignments.push({
      Employee_Name: employee.name,
      Employee_EmailID: employee.email,
      Secret_Child_Name: assignedChild.name,
      Secret_Child_EmailID: assignedChild.email,
    });
  });
  return assignments;
};

export const createCSV = (data: any[]): string => {
  const header =
    "Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID\n";
  const rows = data
    .map(
      (item) =>
        `${escapeCSV(item.Employee_Name)},${escapeCSV(
          item.Employee_EmailID
        )},${escapeCSV(item.Secret_Child_Name)},${escapeCSV(
          item.Secret_Child_EmailID
        )}`
    )
    .join("\n");
  return header + rows;
};

export const escapeCSV = (value: string): string => {
  if (value.includes('"')) {
    value = value.replace(/"/g, '""');
  }
  if (value.includes(",") || value.includes("\n") || value.includes('"')) {
    value = `"${value}"`;
  }
  return value;
};
