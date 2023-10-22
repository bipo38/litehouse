CREATE TABLE IF NOT EXISTS users(
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name VARCHAR(25) NOT NULL,
       password varchar(30) NOT NULL,
       email nvarchar(255) NOT NULL UNIQUE,
       created_at DATETIME NOT NULL
);