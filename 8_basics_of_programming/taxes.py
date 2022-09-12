def calculate_tax(tax_type, ammount):
  if tax_type=="luxury":
    return ammount * 0.10
  else:
    return ammount * 0.08

purse_tax=calculate_tax("non-luxury", 100)
restaurant_tax=calculate_tax("luxury", 100)
print("purse_tax is " + str(purse_tax))
print("restaurant_tax is " + str(restaurant_tax))