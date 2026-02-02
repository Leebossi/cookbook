-- Initialize development database with sample recipes

CREATE TABLE IF NOT EXISTS recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    type VARCHAR
);

INSERT INTO recipe (name, type) VALUES
    ('Spaghetti Carbonara', 'Italian'),
    ('Chicken Tikka Masala', 'Indian'),
    ('Beef Tacos', 'Mexican'),
    ('Greek Salad', 'Greek'),
    ('Pad Thai', 'Thai'),
    ('Margherita Pizza', 'Italian'),
    ('Caesar Salad', 'American'),
    ('Mushroom Risotto', 'Italian'),
    ('Beef Stroganoff', 'Russian'),
    ('Tom Yum Soup', 'Thai');
