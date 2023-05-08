from products import InventoryObjects

#Coffees
testCoffee1 = InventoryObjects.Coffee(name='testCoffee1', origin='Ethiopia', variety='Arabica', process='Washed', roast='Light', farmer='Max', price=12)
testCoffee2 = InventoryObjects.Coffee(name='testCoffee2', origin='Colombia', variety='Arabica', process='Natural', roast='Light', farmer='Max', price=12)

#Grinders
fellowOde = InventoryObjects.Grinder(name='Fellow ode', burrs='sspRedSpeed', price=350)
wilfaUniform = InventoryObjects.Grinder(name='Wilfa Uniform', burrs='Wilfa Standard Burrs', price='250')
