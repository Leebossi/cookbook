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

CREATE TABLE IF NOT EXISTS ingredient (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    amount FLOAT NOT NULL,
    unit VARCHAR NOT NULL,
    "recipeId" INTEGER NOT NULL REFERENCES recipe(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS instruction (
    id SERIAL PRIMARY KEY,
    step INTEGER NOT NULL,
    instruction TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL REFERENCES recipe(id) ON DELETE CASCADE
);

-- Ingredients for Spaghetti Carbonara (recipe id 1)
INSERT INTO ingredient (name, amount, unit, "recipeId") VALUES
    ('Spaghetti', 400, 'grams', 1),
    ('Eggs', 4, 'pieces', 1),
    ('Guanciale', 200, 'grams', 1),
    ('Pecorino Romano', 100, 'grams', 1),
    ('Black Pepper', 2, 'teaspoons', 1),
    ('Salt', 1, 'teaspoon', 1);

-- Instructions for Spaghetti Carbonara (recipe id 1)
INSERT INTO instruction (step, instruction, "recipeId") VALUES
    (1, 'Bring a large pot of salted water to boil and add spaghetti. Cook until al dente.', 1),
    (2, 'While pasta cooks, cut guanciale into small cubes and cook in a large pan over medium heat until crispy.', 1),
    (3, 'In a bowl, whisk together eggs and grated Pecorino Romano cheese.', 1),
    (4, 'Reserve 1 cup of pasta water before draining the spaghetti.', 1),
    (5, 'Add hot drained spaghetti to the pan with guanciale and remove from heat.', 1),
    (6, 'Pour egg mixture over pasta while tossing constantly. Add pasta water gradually until creamy.', 1),
    (7, 'Season with black pepper and serve immediately.', 1);

