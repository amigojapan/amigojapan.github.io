fruits=["banana","apple","peach","pear"] # create a list
print(fruits[0]) # print first element of list
print(fruits[3]) # print second element
print("now reprinting all fruits")
for fruit in fruits: # loops thru the fruits list and assigns each values to the fruit variable
    print(fruit) # prints current "iteration" of the fruit
print("now reprinting all fruits in reverse")
fruits.reverse() # reverses the list
for fruit in fruits:
    print(fruit)
print("now printing fruits in alphabetical order")
fruits.sort() # sorts the list in alphabetical order
for fruit in fruits:
    print(fruit)
