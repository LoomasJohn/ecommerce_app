import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('ecommerce.db');

// Function to initialize tables
export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        image TEXT
      );`,
      [],
      () => console.log('Database initialized'),
      (_, error) => console.error('Error initializing database', error)
    );
  });
};


// Function to add a new product
export const addProduct = (name, price, description) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO products (name, price, description) VALUES (?, ?, ?);',
      [name, price, description],
      (_, result) => console.log('Product added', result),
      (_, error) => console.error('Error adding product', error)
    );
  });
};

// Function to retrieve all products
export const getProducts = (callback) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products;',
        [],
        (_, { rows: { _array } }) => callback(_array),
        (_, error) => console.error('Error retrieving products', error)
      );
    });
  };  

// Function to update a product by ID
export const updateProduct = (id, name, price, description) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?;',
      [name, price, description, id],
      (_, result) => console.log('Product updated', result),
      (_, error) => console.error('Error updating product', error)
    );
  });
};

// Function to delete a product by ID
export const deleteProduct = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM products WHERE id = ?;',
      [id],
      (_, result) => console.log('Product deleted', result),
      (_, error) => console.error('Error deleting product', error)
    );
  });
};
