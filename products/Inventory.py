# from products import Burr,Coffee,Grinder
from products import InventoryObjects

#Burrs
# sspRedSpeed = Burr.Burr(name='SSP Red Speed', type='flat', size=64, price=120)
# sspLabSweet = Burr.Burr(name='SSP Lab Sweet', type='flat', size=64, price=150)

#Coffees
testCoffee1 = InventoryObjects.Coffee(name='testCoffee1', origin='Ethiopia', variety='Arabica', process='Washed', roast='Light', farmer='Max', price=12)
testCoffee2 = InventoryObjects.Coffee(name='testCoffee2', origin='Colombia', variety='Arabica', process='Natural', roast='Light', farmer='Max', price=12)
# testCoffee1 = Coffee.Coffee(name='testCoffee1', origin='Ethiopia', variety='Arabica', process='Washed', roast='Light', farmer='Max', price=12)
# testCoffee2 = Coffee.Coffee(name='testCoffee2', origin='Colombia', variety='Arabica', process='Natural', roast='Light', farmer='Max', price=12)

#Grinders
fellowOde = InventoryObjects.Grinder(name='Fellow ode', burrs='sspRedSpeed', price=350)
wilfaUniform = InventoryObjects.Grinder(name='Wilfa Uniform', burrs='Wilfa Standard Burrs', price='250')
# fellowOde = Grinder.Grinder(name='Fellow ode', burrs='sspRedSpeed', price=350)
# wilfaUniform = Grinder.Grinder(name='Wilfa Uniform', burrs='Wilfa Standard Burrs', price='250')