CREATE TABLE blog (
    id PRIMARY KEY SERIAL,
    author TEXT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blog (author, title, url) values ('Jack Sparrow', 'No more way', 'http://safwanerrai');
INSERT INTO blog (author, title, url) values ('Murrah Mullah', 'Far East', 'http://jackgraealp');
