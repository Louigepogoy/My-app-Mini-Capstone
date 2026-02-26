 "use client";

import { useEffect, useState } from "react";

type Vehicle = {
  id: string;
  name: string;
  brand: string;
  owner: string;
  plate: string;
  price: number;
  location: string;
  status: "available" | "rented";
};

type Booking = {
  id: string;
  vehicleId: string;
  vehicleName: string;
  pickupLocation: string;
  status: "confirmed";
};

export default function CustomerDashboardPage() {
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const vehiclesRaw = window.localStorage.getItem("vehicles");
    const allVehicles: Vehicle[] = vehiclesRaw ? JSON.parse(vehiclesRaw) : [];

    const bookingsRaw = window.localStorage.getItem("bookings");
    const storedBookings: Booking[] = bookingsRaw ? JSON.parse(bookingsRaw) : [];

    setAvailableVehicles(allVehicles.filter((v) => v.status === "available"));
    setBookings(storedBookings);
  }, []);

  function handleRent(vehicle: Vehicle) {
    const booking: Booking = {
      id: Date.now().toString(),
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      pickupLocation: vehicle.location,
      status: "confirmed",
    };

    setAvailableVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
    setBookings((prev) => [...prev, booking]);

    if (typeof window !== "undefined") {
      const vehiclesRaw = window.localStorage.getItem("vehicles");
      const allVehicles: Vehicle[] = vehiclesRaw ? JSON.parse(vehiclesRaw) : [];
      const updatedVehicles = allVehicles.map((v) =>
        v.id === vehicle.id ? { ...v, status: "rented" } : v,
      );
      window.localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));

      const bookingsRaw = window.localStorage.getItem("bookings");
      const storedBookings: Booking[] = bookingsRaw ? JSON.parse(bookingsRaw) : [];
      window.localStorage.setItem("bookings", JSON.stringify([...storedBookings, booking]));
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-3 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
              Customer dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
              Welcome to your trips
            </h1>
            <p className="mt-1 text-xs text-slate-400 md:text-sm">
              View vehicles added by admins, rent them, and track your bookings.
            </p>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">Upcoming trips</h2>
                <p className="text-[11px] text-slate-400">
                  Trips you&apos;ve booked from available vehicles.
                </p>
              </div>
            </div>

            <div className="mt-2 space-y-3 text-xs">
              {bookings.length === 0 ? (
                <article className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">No upcoming trips</p>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      Demo
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Rent a vehicle from the list of available cars to see your bookings here.
                  </p>
                </article>
              ) : (
                bookings.map((booking) => (
                  <article
                    key={booking.id}
                    className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/70 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{booking.vehicleName}</p>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                        Confirmed
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Pickup location: {booking.pickupLocation}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Status: <span className="font-semibold capitalize">{booking.status}</span>
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
            <h2 className="text-sm font-semibold">Available vehicles</h2>
            <p className="text-[11px] text-slate-400">
              Cars created by admins that you can rent.
            </p>
            <div className="mt-3 grid gap-3 text-xs md:grid-cols-1">
              {availableVehicles.length === 0 ? (
                <p className="rounded-xl bg-slate-950/70 px-3 py-2 text-[11px] text-slate-300">
                  No vehicles are currently available. Once an admin adds vehicles, they&apos;ll
                  appear here.
                </p>
              ) : (
                availableVehicles.map((vehicle) => (
                  <article
                    key={vehicle.id}
                    className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{vehicle.name}</p>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                        Available
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                      <p>
                        Brand: <span className="text-slate-200">{vehicle.brand}</span>
                      </p>
                      <p>
                        Owner: <span className="text-slate-200">{vehicle.owner}</span>
                      </p>
                      <p>
                        Plate: <span className="text-slate-200">{vehicle.plate}</span>
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Location: <span className="text-slate-200">{vehicle.location}</span>
                    </p>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-300">
                      <p>
                        From{" "}
                        <span className="font-semibold">
                          ₱{vehicle.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                        /day
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRent(vehicle)}
                        className="rounded-full bg-sky-500 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-sky-400"
                      >
                        Rent
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

