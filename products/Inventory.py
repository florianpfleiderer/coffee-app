from products import Burr,Coffee,Grinder

#Burrs
sspRedSpeed = Burr.Burr(name='SSP Red Speed', type='flat', size=64, price=120)
sspLabSweet = Burr.Burr(name='SSP Lab Sweet', type='flat', size=64, price=150)

#Coffees
testCoffee1 = Coffee.Coffee(name='testCoffee1', origin='Ethiopia', variety='Arabica', process='Washed', roast='Light', farmer='Max', price=12)
testCoffee2 = Coffee.Coffee(name='testCoffee2', origin='Colombia', variety='Arabica', process='Natural', roast='Light', farmer='Max', price=12)

#Grinders
fellowOde = Grinder.Grinder(name='Fellow ode', burrs=sspRedSpeed, price=350)