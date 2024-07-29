build = [3, 5, 4, 4, 3, 1, 3, 2]
x = len(build)

print(build[x - 1])  # Printing the last element
current_max = build[x - 1]  # Initialize with the last element

for i in range(x - 2, -1, -1):  # Iterating from the second last element to the first
    if build[i] >= build[i + 1] and build[i] > current_max:  # Check if the current element is greater than or equal to the next element
        print(build[i])
        current_max = build[i]
