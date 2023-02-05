CREATE DATABASE ioyne-db
CREATE TABLE clients (
	client_id SERIAL PRIMARY KEY,
	cl_name VARCHAR(255),
	cl_lastname VARCHAR(255),
  cl_email VARCHAR(255) NOT NULL UNIQUE,
  cl_ident INT NOT NULL UNIQUE,
  cl_address VARCHAR(255) NOT NULL
);
CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  pd_name VARCHAR(255) NOT NULL,
  pd_description VARCHAR(255) NOT NULL,
  pd_price FLOAT,
  pd_image VARCHAR(200)
  UNIQUE (pd_name)
);
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  us_name VARCHAR(255),
  us_lastname VARCHAR(255),
	us_email VARCHAR(255) NOT NULL,
	us_password VARCHAR(255) NOT NULL,
	us_created DATE DEFAULT CURRENT_DATE,
	us_admin BOOLEAN,
  UNIQUE (us_email)
);
CREATE TABLE quotations (
  quotation_id SERIAL PRIMARY KEY,
	client_id INT REFERENCES clients (client_id),
	product_id INT REFERENCES products (product_id),
  user_id INT REFERENCES users (user_id),
  qu_created DATE DEFAULT CURRENT_DATE, 
  qu_value FLOAT,
  qu_ident VARCHAR(30)
)
