create database acamica_delilah;
use acamica_delilah;

create table users(
id serial primary key,
username varchar(30) unique not null,
password varchar(500) not null,
rol varchar(6) not null,
fullname varchar(350) not null,
address varchar(350) not null,
phone varchar(20) not null,
email varchar(100) not null,
createdat timestamp default now(),
updatedat timestamp
);

create table products(
id serial primary key,
description varchar(450) not null,
price decimal(9,2) not null,
image varchar(450) not null,
createdat timestamp default now(),
updatedat timestamp
);

create table orders (
 id serial primary key,
 status varchar(15) not null,
 payment varchar(20) not null,
 address varchar(450) not null,
 total decimal(9,2) not null,
 userid bigint unsigned,
 createat timestamp default now(),
 updateat timestamp,
 foreign key (userid) references users (id)
);

create table orders_products(
id serial primary key,
productid bigint unsigned,
orderid bigint unsigned,
createat timestamp default now(),
updateat timestamp,
foreign key (productid) references products (id),
foreign key (orderid) references orders (id)
);