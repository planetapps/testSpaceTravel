import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const destinations = ["International Space Station", "Lunar Hotel", "Mars Colony"];
const seatClasses = ["Economy", "Luxury", "VIP Zero-Gravity Experience"];
const packages = ["Standard Package", "Premium Package", "Ultimate Space Experience"];
const hotels = ["Orbital Space Inn", "Lunar Resort", "Mars Haven"];

export default function SpaceTravelBooking() {
  const [trip, setTrip] = useState({
    departureDate: "",
    returnDate: "",
    destination: "",
    seatClass: "",
    package: "",
    hotel: ""
  });

  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState([]);

  const validate = () => {
    let newErrors = {};
    if (!trip.departureDate) newErrors.departureDate = "Departure date is required.";
    if (!trip.returnDate) newErrors.returnDate = "Return date is required.";
    if (!trip.destination) newErrors.destination = "Please select a destination.";
    if (!trip.seatClass) newErrors.seatClass = "Please select a seat class.";
    if (!trip.package) newErrors.package = "Please select a travel package.";
    if (!trip.hotel) newErrors.hotel = "Please select accommodation.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = () => {
    if (!validate()) return;
    setBookings([...bookings, trip]);
    setTrip({ departureDate: "", returnDate: "", destination: "", seatClass: "", package: "", hotel: "" });
    setErrors({});
  };

  const handleCancelBooking = (index) => {
    setBookings(bookings.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 space-y-6 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold text-center">Space Travel Booking</h1>
      <Card className="bg-gray-100 p-6">
        <CardContent className="space-y-4">
          <div className="flex justify-center space-x-4 mt-6">
            <div>
              <Input
                type="date"
                className="flex-1"
                min={new Date().toISOString().split("T")[0]}
                value={trip.departureDate}
                onChange={(e) => setTrip({ ...trip, departureDate: e.target.value })}
                placeholder="Departure Date"
              />
              {errors.departureDate && <p className="text-red-500 text-sm">{errors.departureDate}</p>}
            </div>
            <div>
              <Input
                type="date"
                className="flex-1"
                min={trip.departureDate}
                value={trip.returnDate}
                onChange={(e) => setTrip({ ...trip, returnDate: e.target.value })}
                placeholder="Return Date"
              />
              {errors.returnDate && <p className="text-red-500 text-sm">{errors.returnDate}</p>}
            </div>
          </div>

          <div>
            <Select onValueChange={(value) => setTrip({ ...trip, destination: value })}>
              <SelectTrigger>{trip.destination || "Select Destination"}</SelectTrigger>
              <SelectContent>
                {destinations.map((dest) => (
                  <SelectItem key={dest} value={dest}>
                    {dest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.destination && <p className="text-red-500 text-sm">{errors.destination}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {seatClasses.map((seat) => (
              <Card
                key={seat}
                className={`p-4 cursor-pointer text-center bg-gray-300 ${trip.seatClass === seat ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setTrip({ ...trip, seatClass: seat })}
              >
                {seat}
              </Card>
            ))}
          </div>
          {errors.seatClass && <p className="text-red-500 text-sm">{errors.seatClass}</p>}

          <div>
            <Select onValueChange={(value) => setTrip({ ...trip, package: value })}>
              <SelectTrigger>{trip.package || "Select Travel Package"}</SelectTrigger>
              <SelectContent>
                {packages.map((pkg) => (
                  <SelectItem key={pkg} value={pkg}>
                    {pkg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.package && <p className="text-red-500 text-sm">{errors.package}</p>}
          </div>

          <div>
            <Select onValueChange={(value) => setTrip({ ...trip, hotel: value })}>
              <SelectTrigger>{trip.hotel || "Select Accommodation"}</SelectTrigger>
              <SelectContent>
                {hotels.map((hotel) => (
                  <SelectItem key={hotel} value={hotel}>
                    {hotel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.hotel && <p className="text-red-500 text-sm">{errors.hotel}</p>}
          </div>

          <Button onClick={handleBooking} className="bg-blue-500 hover:bg-blue-600">Book Trip</Button>
        </CardContent>
      </Card>

      {bookings.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Your Bookings</h2>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Destination</th>
                <th className="border border-gray-300 p-2">Departure</th>
                <th className="border border-gray-300 p-2">Return</th>
                <th className="border border-gray-300 p-2">Seat Class</th>
                <th className="border border-gray-300 p-2">Package</th>
                <th className="border border-gray-300 p-2">Hotel</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{booking.destination}</td>
                  <td className="border border-gray-300 p-2">{booking.departureDate}</td>
                  <td className="border border-gray-300 p-2">{booking.returnDate}</td>
                  <td className="border border-gray-300 p-2">{booking.seatClass}</td>
                  <td className="border border-gray-300 p-2">{booking.package}</td>
                  <td className="border border-gray-300 p-2">{booking.hotel}</td>
                  <td className="border border-gray-300 p-2">
                    <Button onClick={() => handleCancelBooking(index)} className="bg-red-500 hover:bg-red-600">Cancel</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
