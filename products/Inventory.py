'''TODO Module docstring
'''

from products import inventory_objects

#Coffees
chooseCoffee = inventory_objects.Coffee(name='Choose a Coffee', origin='',
                                       variety='', process='', roast='',
                                       farmer='', price=0)
testCoffee1 = inventory_objects.Coffee(name='testCoffee1', origin='Ethiopia',
                                      variety='Arabica', process='Washed',
                                      roast='Light', farmer='Max', price=12)
testCoffee2 = inventory_objects.Coffee(name='testCoffee2', origin='Colombia', 
                                      variety='Arabica', process='Natural',
                                      roast='Light', farmer='Max', price=12)

#Grinders
chooseGrinder = inventory_objects.Grinder(name='Choose a Grinder', burrs='', price=0)
fellowOde = inventory_objects.Grinder(name='Fellow ode', burrs='sspRedSpeed', price=350)
wilfaUniform = inventory_objects.Grinder(name='Wilfa Uniform', 
                                        burrs='Wilfa Standard Burrs', price='250')

#Recipes
v60 = inventory_objects.Recipe(name='V60', coffee=testCoffee2.name, grinder=wilfaUniform.name,
                              water=250, coffeeIn=15, ratio=250/10, temp=98, totalTime=180,
                              Pour1stTime=60, Pour2ndTime=120)
aeropress = inventory_objects.Recipe(name='Aeropress', coffee=testCoffee1.name, 
                                    grinder=fellowOde.name, water=200, coffeeIn=15, ratio=200/10,
                                    temp=97, totalTime=200, Pour1stTime=70, Pour2ndTime=130)