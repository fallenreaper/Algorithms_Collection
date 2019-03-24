
from parking_garage import Garage, Allocation, Bike, Car, Truck

def main():
    garage = Garage(Allocation())
    tickets = list()
    tup = garage.get_ticket(Car("car1234"))
    print("{}: {}".format(123, tup))
    tickets.append(tup)
    for i in range(20):
        tup = garage.get_ticket(Bike("bike{}".format(i)))
        print("{}: {}".format(i, tup))
        if tup is not None:
            tickets.append(tup)
    for i in range(30):
        tup = garage.get_ticket(Truck("truck{}".format(i)))
        print("{}: {}".format(i, tup))
        if tup is not None:
            tickets.append(tup)
    for i in range(30):
        tup = garage.get_ticket(Car("car{}".format(i)))
        print("{}: {}".format(i, tup))
        if tup is not None:
            tickets.append(tup)
    print(garage.allocation.spaces)
    print(garage.stored)
    print("Tickets: {}".format(tickets))
    print("-------------------------------------")
    print([str(garage.stored[k]) for k in garage.stored.keys()])
    print("-------------------------------------")
    for ticket in tickets:
        returnVal = garage.return_ticket(ticket)
        if returnVal:
            print("Ticket: {} Returned".format(ticket))
        else:
            print("Ticket: {} Failed to be Returned".format(ticket))
    print(garage.stored)
    print(garage.allocation.spaces)

if __name__=="__main__":
    main()