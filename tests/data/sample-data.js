// Shared sample datasets for AG Grid test scenarios.
// Exposed as global window.SampleData so any test page can pick what it needs.

(function () {
  const employees = [
    { id: 1,  first_name: 'Alice',   last_name: 'Anderson', email: 'alice@acme.test',   department: 'Engineering', salary: 92500,  hire_date: '2019-03-12', active: true,  rating: 4.6 },
    { id: 2,  first_name: 'Bob',     last_name: 'Brown',    email: 'bob@acme.test',     department: 'Sales',       salary: 67000,  hire_date: '2020-07-01', active: true,  rating: 3.9 },
    { id: 3,  first_name: 'Carol',   last_name: 'Carter',   email: 'carol@acme.test',   department: 'Marketing',   salary: 71200,  hire_date: '2018-11-23', active: false, rating: 4.1 },
    { id: 4,  first_name: 'David',   last_name: 'Davis',    email: 'david@acme.test',   department: 'Engineering', salary: 110000, hire_date: '2017-05-15', active: true,  rating: 4.8 },
    { id: 5,  first_name: 'Eve',     last_name: 'Edwards',  email: 'eve@acme.test',     department: 'HR',          salary: 58000,  hire_date: '2021-09-03', active: true,  rating: 3.5 },
    { id: 6,  first_name: 'Frank',   last_name: 'Foster',   email: 'frank@acme.test',   department: 'Finance',     salary: 85000,  hire_date: '2016-02-10', active: false, rating: 4.0 },
    { id: 7,  first_name: 'Grace',   last_name: 'Garcia',   email: 'grace@acme.test',   department: 'Engineering', salary: 99800,  hire_date: '2022-01-18', active: true,  rating: 4.3 },
    { id: 8,  first_name: 'Henry',   last_name: 'Hughes',   email: 'henry@acme.test',   department: 'Sales',       salary: 72500,  hire_date: '2019-12-05', active: true,  rating: 3.7 },
    { id: 9,  first_name: 'Ivy',     last_name: 'Ingram',   email: 'ivy@acme.test',     department: 'Marketing',   salary: 64000,  hire_date: '2023-04-20', active: true,  rating: 4.2 },
    { id: 10, first_name: 'Jack',    last_name: 'Jones',    email: 'jack@acme.test',    department: 'Finance',     salary: 88000,  hire_date: '2018-08-30', active: false, rating: 3.8 },
    { id: 11, first_name: 'Kate',    last_name: 'King',     email: 'kate@acme.test',    department: 'Engineering', salary: 105000, hire_date: '2015-06-22', active: true,  rating: 4.9 },
    { id: 12, first_name: 'Leo',     last_name: 'Lewis',    email: 'leo@acme.test',     department: 'HR',          salary: 60500,  hire_date: '2020-10-11', active: true,  rating: 3.6 },
    { id: 13, first_name: 'Mia',     last_name: 'Mitchell', email: 'mia@acme.test',     department: 'Sales',       salary: 78000,  hire_date: '2019-02-14', active: true,  rating: 4.4 },
    { id: 14, first_name: 'Noah',    last_name: 'Nelson',   email: 'noah@acme.test',    department: 'Marketing',   salary: 69500,  hire_date: '2021-03-27', active: false, rating: 3.9 },
    { id: 15, first_name: 'Olivia',  last_name: 'Owens',    email: 'olivia@acme.test',  department: 'Engineering', salary: 95000,  hire_date: '2017-11-08', active: true,  rating: 4.5 },
    { id: 16, first_name: 'Peter',   last_name: 'Parker',   email: 'peter@acme.test',   department: 'Finance',     salary: 81000,  hire_date: '2022-05-19', active: true,  rating: 4.0 },
    { id: 17, first_name: 'Quinn',   last_name: 'Quinn',    email: 'quinn@acme.test',   department: 'HR',          salary: 62000,  hire_date: '2019-09-16', active: true,  rating: 3.7 },
    { id: 18, first_name: 'Rachel',  last_name: 'Reed',     email: 'rachel@acme.test',  department: 'Sales',       salary: 75500,  hire_date: '2018-04-25', active: false, rating: 4.1 },
    { id: 19, first_name: 'Sam',     last_name: 'Scott',    email: 'sam@acme.test',     department: 'Engineering', salary: 102000, hire_date: '2016-12-01', active: true,  rating: 4.7 },
    { id: 20, first_name: 'Tina',    last_name: 'Taylor',   email: 'tina@acme.test',    department: 'Marketing',   salary: 70000,  hire_date: '2020-06-30', active: true,  rating: 4.2 },
    { id: 21, first_name: 'Uma',     last_name: 'Underwood',email: 'uma@acme.test',     department: 'Finance',     salary: 89500,  hire_date: '2017-08-17', active: true,  rating: 4.3 },
    { id: 22, first_name: 'Victor',  last_name: 'Vance',    email: 'victor@acme.test',  department: 'HR',          salary: 59500,  hire_date: '2023-01-09', active: true,  rating: 3.4 },
    { id: 23, first_name: 'Wendy',   last_name: 'Walker',   email: 'wendy@acme.test',   department: 'Sales',       salary: 80000,  hire_date: '2019-07-23', active: false, rating: 4.0 },
    { id: 24, first_name: 'Xavier',  last_name: 'Xu',       email: 'xavier@acme.test',  department: 'Engineering', salary: 98000,  hire_date: '2021-11-15', active: true,  rating: 4.6 },
    { id: 25, first_name: 'Yara',    last_name: 'Young',    email: 'yara@acme.test',    department: 'Marketing',   salary: 73500,  hire_date: '2018-09-04', active: true,  rating: 4.1 }
  ];

  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance'];

  // Orders dataset for grouping/aggregation tests.
  const orders = [
    { id: 101, customer: 'Acme Corp',   region: 'NA',  product: 'Widget',   qty: 12, unit_price: 25.50,  total: 306.00, order_date: '2025-01-12' },
    { id: 102, customer: 'Globex',      region: 'EU',  product: 'Gadget',   qty: 7,  unit_price: 99.99,  total: 699.93, order_date: '2025-01-15' },
    { id: 103, customer: 'Initech',     region: 'NA',  product: 'Widget',   qty: 30, unit_price: 25.50,  total: 765.00, order_date: '2025-02-01' },
    { id: 104, customer: 'Umbrella',    region: 'APAC',product: 'Sprocket', qty: 5,  unit_price: 49.95,  total: 249.75, order_date: '2025-02-08' },
    { id: 105, customer: 'Stark Ind.',  region: 'NA',  product: 'Gadget',   qty: 20, unit_price: 99.99,  total: 1999.80,order_date: '2025-02-14' },
    { id: 106, customer: 'Wayne Ent.',  region: 'NA',  product: 'Widget',   qty: 50, unit_price: 25.50,  total: 1275.00,order_date: '2025-03-03' },
    { id: 107, customer: 'Globex',      region: 'EU',  product: 'Sprocket', qty: 14, unit_price: 49.95,  total: 699.30, order_date: '2025-03-12' },
    { id: 108, customer: 'Acme Corp',   region: 'NA',  product: 'Gadget',   qty: 3,  unit_price: 99.99,  total: 299.97, order_date: '2025-03-20' },
    { id: 109, customer: 'Initech',     region: 'NA',  product: 'Sprocket', qty: 22, unit_price: 49.95,  total: 1098.90,order_date: '2025-04-01' },
    { id: 110, customer: 'Umbrella',    region: 'APAC',product: 'Widget',   qty: 18, unit_price: 25.50,  total: 459.00, order_date: '2025-04-09' },
    { id: 111, customer: 'Stark Ind.',  region: 'NA',  product: 'Sprocket', qty: 9,  unit_price: 49.95,  total: 449.55, order_date: '2025-04-22' },
    { id: 112, customer: 'Wayne Ent.',  region: 'NA',  product: 'Gadget',   qty: 11, unit_price: 99.99,  total: 1099.89,order_date: '2025-05-04' }
  ];

  window.SampleData = { employees, orders, departments };
})();
