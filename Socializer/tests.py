# Define the list of names
names = ["John", "Alice", "Bob", "Eve", "Charlie"]

# Count the number of likes
like_count = len(names) - 1  # Subtract 1 for the name "John"

# Format the like message
if like_count == 0:
    like_message = f"{names[0]} likes this post."
elif like_count == 1:
    like_message = f"{names[0]} and {names[1]} like this post."
else:
    like_message = f"{names[0]} and {like_count} others like this post."

# Print the like message
print(like_message)
