
class Allocation:
    def __init__(self):
        self.spaces = {}
        self.spaces[1] = 10
        self.spaces[2] = 40
        self.spaces[3] = 15

# Each Vechicle fits in a space at LEAST its size.

class Garage:
    def __init__(self, allocation):
        self.stored = {}
        self.allocation = allocation
    def get_ticket(self, vehicle):
        #print("Start: {}, End: {}".format(vehicle.size, max(self.allocation.spaces)))
        for id in range(vehicle.size, max(self.allocation.spaces.keys()) + 1):
            if self.allocation.spaces[id] > 0:
                self.allocation.spaces[id] -= 1
                self.stored[vehicle.plate] = vehicle
                return (id, vehicle.plate)
        return None
    def return_ticket(self, tup):
        if tup is None:
            return False
        id, plate = tup
        if self.allocation.spaces[id] is None:
            return False
        if self.stored[plate] is None:
            return False
        del self.stored[plate]
        self.allocation.spaces[id] += 1
        return True

class Vehicle:
    def __init__(self, plate):
        self.plate = plate
    def __str__(self):
        return "Vehicle: {}".format(self.plate)
    def __repr__(self):
        return "Vehicle('{}')".format(self.plate)

class Bike(Vehicle):
    size = 1
    def __init__(self, plate):
        Vehicle.__init__(self, plate)
    def __str__(self):
        return "Bike: {}".format(self.plate)
    def __repr__(self):
        return "Bike('{}')".format(self.plate)

class Car(Vehicle):
    size = 2
    def __init__(self, plate):
        Vehicle.__init__(self, plate)
    def __str__(self):
        return "Car: {}".format(self.plate)
    def __repr__(self):
        return "Car('{}')".format(self.plate)

class Truck(Vehicle):
    size = 3
    def __init__(self, plate):
        Vehicle.__init__(self, plate)
    def __str__(self):
        return "Truck: {}".format(self.plate)
    def __repr__(self):
        return "Truck('{}')".format(self.plate)
