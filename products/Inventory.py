from products import InventoryObjects

#Coffees
chooseCoffee = inventoryObjects.Coffee(name='Choose a Coffee', origin='', variety='', process='', roast='', farmer='', price=0)
testCoffee1 = inventoryObjects.Coffee(name='testCoffee1', origin='Ethiopia', variety='Arabica', process='Washed', roast='Light', farmer='Max', price=12)
testCoffee2 = inventoryObjects.Coffee(name='testCoffee2', origin='Colombia', variety='Arabica', process='Natural', roast='Light', farmer='Max', price=12)
# testCoffee1 = Coffee.Coffee(name='testCoffee1', origin='Ethiopia', variety='Arabica', process='Washed', roast='Light', farmer='Max', price=12)
# testCoffee2 = Coffee.Coffee(name='testCoffee2', origin='Colombia', variety='Arabica', process='Natural', roast='Light', farmer='Max', price=12)

#Grinders
chooseGrinder = inventoryObjects.Grinder(name='Choose a Grinder', burrs='', price=0)
fellowOde = inventoryObjects.Grinder(name='Fellow ode', burrs='sspRedSpeed', price=350)
wilfaUniform = inventoryObjects.Grinder(name='Wilfa Uniform', burrs='Wilfa Standard Burrs', price='250')
# fellowOde = Grinder.Grinder(name='Fellow ode', burrs='sspRedSpeed', price=350)
# wilfaUniform = Grinder.Grinder(name='Wilfa Uniform', burrs='Wilfa Standard Burrs', price='250')

#Recipes
newRecipe = inventoryObjects.Recipe(name='Create new Recipe', coffee=chooseCoffee.name, grinder=chooseGrinder.name, water=0, coffeeIn=0, ratio=0, temp=0, totalTime=0, Pour1stTime=0, Pour2ndTime=0)
v60 = inventoryObjects.Recipe(name='V60', coffee=testCoffee2.name, grinder=wilfaUniform.name, water=250, coffeeIn=15, ratio=250/15, temp=98, totalTime=180, Pour1stTime=60, Pour2ndTime=120)
aeropress = inventoryObjects.Recipe(name='Aeropress', coffee=testCoffee1.name, grinder=fellowOde.name, water=200, coffeeIn=15, ratio=200/15, temp=97, totalTime=200, Pour1stTime=70, Pour2ndTime=130)

