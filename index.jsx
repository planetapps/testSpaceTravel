import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SpaceTravelBooking = () => {
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [fromLocation, setFromLocation] = useState("Earth");
  const [destination, setDestination] = useState("Space Station Alpha");
  const [seatClass, setSeatClass] = useState("Economy");
  const [roomType, setRoomType] = useState("Standard");
  const [numTravelers, setNumTravelers] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [recommendedAccommodations, setRecommendedAccommodations] = useState([]);

  const destinations = ["Space Station Alpha", "Lunar Hotel", "Mars Colony"];
  const seatClasses = ["Economy", "Luxury", "VIP Zero-Gravity"];
  const roomTypes = ["Standard", "Suite", "Presidential"];
  const accommodations = {
    "Space Station Alpha": ["Alpha Suites", "Orbital Haven"],
    "Lunar Hotel": ["Moonlight Resort", "Lunar Base Inn"],
    "Mars Colony": ["Red Planet Habitat", "Martian Retreat"]
  };

  useEffect(() => {
    setRecommendedAccommodations(accommodations[destination] || []);
  }, [destination]);

  const handleBooking = () => {
    if (!departureDate) {
      alert("Please select a departure date.");
      return;
    }
    if (!returnDate) {
      alert("Please select a return date.");
      return;
    }
    if (new Date(departureDate) < new Date()) {
      alert("Departure date cannot be in the past.");
      return;
    }
    if (new Date(returnDate) < new Date(departureDate)) {
      alert("Return date cannot be before departure date.");
      return;
    }
    if (!destination || !fromLocation) {
      alert("Please select both departure and destination locations.");
      return;
    }
    if (numTravelers <= 0) {
      alert("Number of travelers must be at least 1.");
      return;
    }
    const newBooking = { departureDate, returnDate, fromLocation, destination, seatClass, roomType, numTravelers };
    setBookings([...bookings, newBooking]);
  };

  const clearBookings = () => {
    setBookings([]);
  };

  return (
    <div className="p-6 space-y-6 bg-white text-black rounded-lg shadow-lg flex justify-center">
      <div className="w-full max-w-2xl">
        <Tabs defaultValue="book">
          <TabsList>
            <TabsTrigger value="book">Book Trip</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="book">
            <Card>
              <CardContent className="space-y-4 p-4">
                <h2 className="text-2xl font-bold">Schedule Your Space Trip</h2>
                <label>Departure Date</label>
                <Input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
                <label>Return Date</label>
                <Input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                <label>Traveling From</label>
                <Input type="text" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} />
                <label>Destination</label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger>{destination}</SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <label>Seat Class</label>
                <Select value={seatClass} onValueChange={setSeatClass}>
                  <SelectTrigger>{seatClass}</SelectTrigger>
                  <SelectContent>
                    {seatClasses.map((cls) => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <label>Room Type</label>
                <Select value={roomType} onValueChange={setRoomType}>
                  <SelectTrigger>{roomType}</SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <label>Number of Travelers</label>
                <Input type="number" min="1" value={numTravelers} onChange={(e) => setNumTravelers(parseInt(e.target.value) || 1)} />
                <Button className="bg-blue-500 hover:bg-blue-700" onClick={handleBooking}>Book Now</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard">
            <Card>
              <CardContent className="space-y-4 p-4">
                <h2 className="text-2xl font-bold">Your Bookings</h2>
                {bookings.length === 0 ? (
                  <p>No upcoming trips</p>
                ) : (
                  <>
                    <ul className="space-y-2">
                      {bookings.map((booking, index) => (
                        <li key={index} className="p-2 border border-gray-300 rounded-lg">
                          <p><strong>From:</strong> {booking.fromLocation}</p>
                          <p><strong>To:</strong> {booking.destination}</p>
                          <p><strong>Departure:</strong> {booking.departureDate}</p>
                          <p><strong>Return:</strong> {booking.returnDate}</p>
                          <p><strong>Seat Class:</strong> {booking.seatClass}</p>
                          <p><strong>Room Type:</strong> {booking.roomType}</p>
                          <p><strong>Travelers:</strong> {booking.numTravelers}</p>
                        </li>
                      ))}
                    </ul>
                    <Button className="bg-red-500 hover:bg-red-700 mt-4" onClick={clearBookings}>Clear Bookings</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SpaceTravelBooking;
