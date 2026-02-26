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

type VehicleRequest = {
  id: string;
  ownerName: string;
  name: string;
  brand: string;
  plate: string;
  price: number;
  location: string;
  status: "pending";
};

export default function OwnerDashboardPage() {
  const [ownerName, setOwnerName] = useState("");
  const [myVehicles, setMyVehicles] = useState<Vehicle[]>([]);
  const [myRequests, setMyRequests] = useState<VehicleRequest[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedOwnerName = window.localStorage.getItem("ownerName") || "";
    setOwnerName(storedOwnerName);

    const vehiclesRaw = window.localStorage.getItem("vehicles");
    const allVehicles: Vehicle[] = vehiclesRaw ? JSON.parse(vehiclesRaw) : [];

    const requestsRaw = window.localStorage.getItem("vehicleRequests");
    const allRequests: VehicleRequest[] = requestsRaw ? JSON.parse(requestsRaw) : [];

    if (storedOwnerName) {
      setMyVehicles(allVehicles.filter((v) => v.owner === storedOwnerName));
      setMyRequests(
        allRequests.filter(
          (r) => r.ownerName === storedOwnerName && r.status === "pending",
        ),
      );
    } else {
      setMyVehicles([]);
      setMyRequests([]);
    }
  }, []);

  function refreshData(currentOwnerName: string) {
    if (typeof window === "undefined") return;

    const vehiclesRaw = window.localStorage.getItem("vehicles");
    const allVehicles: Vehicle[] = vehiclesRaw ? JSON.parse(vehiclesRaw) : [];

    const requestsRaw = window.localStorage.getItem("vehicleRequests");
    const allRequests: VehicleRequest[] = requestsRaw ? JSON.parse(requestsRaw) : [];

    setMyVehicles(allVehicles.filter((v) => v.owner === currentOwnerName));
    setMyRequests(
      allRequests.filter(
        (r) => r.ownerName === currentOwnerName && r.status === "pending",
      ),
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const submittedOwnerName = (formData.get("ownerName") as string) || "";
    const name = (formData.get("name") as string) || "";
    const brand = (formData.get("brand") as string) || "";
    const plate = (formData.get("plate") as string) || "";
    const price = Number(formData.get("price") || 0);
    const location = (formData.get("location") as string) || "";

    if (!submittedOwnerName) {
      setMessage("Please enter your name as the vehicle owner.");
      return;
    }

    const request: VehicleRequest = {
      id: Date.now().toString(),
      ownerName: submittedOwnerName,
      name,
      brand,
      plate,
      price,
      location,
      status: "pending",
    };

    try {
      setIsSubmitting(true);

      if (typeof window !== "undefined") {
        const existingRaw = window.localStorage.getItem("vehicleRequests");
        const existing: VehicleRequest[] = existingRaw ? JSON.parse(existingRaw) : [];

        const updated = [...existing, request];
        window.localStorage.setItem("vehicleRequests", JSON.stringify(updated));
        window.localStorage.setItem("ownerName", submittedOwnerName);
      }

      setOwnerName(submittedOwnerName);
      refreshData(submittedOwnerName);
      form.reset();
      setMessage(
        "Vehicle request submitted. An admin must approve it before customers can rent this car.",
      );
    } catch (error) {
      console.error("Failed to submit vehicle request", error);
      setMessage("Something went wrong while submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-3 border-b border-slate-800 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Vehicle owner dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold md:text-3xl">
              Manage your fleet
            </h1>
            <p className="mt-1 text-xs text-slate-400 md:text-sm">
              Request new vehicles, see pending approvals, and track approved cars.
            </p>
          </div>
        </header>

        <main className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg text-xs">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">My vehicles</h2>
                <p className="text-[11px] text-slate-400">
                  Cars that have been approved by admin and are visible to customers.
                </p>
              </div>
            </div>

            <div className="mt-2 space-y-3">
              {ownerName === "" && (
                <p className="rounded-xl bg-slate-950/70 px-3 py-2 text-[11px] text-slate-300">
                  Enter your name in the request form so we can show vehicles that belong to
                  you.
                </p>
              )}

              {ownerName !== "" && myVehicles.length === 0 && (
                <p className="rounded-xl bg-slate-950/70 px-3 py-2 text-[11px] text-slate-300">
                  No approved vehicles yet for <span className="font-semibold">{ownerName}</span>.
                  Once an admin approves your requests, your cars will appear here.
                </p>
              )}

              {myVehicles.map((vehicle) => (
                <article
                  key={vehicle.id}
                  className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/70 p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {vehicle.name} · {vehicle.plate}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        vehicle.status === "available"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-sky-500/10 text-sky-300"
                      }`}
                    >
                      {vehicle.status === "available" ? "Available" : "On trip"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Location: {vehicle.location}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Daily rate:{" "}
                    <span className="font-semibold">
                      ₱
                      {vehicle.price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg text-xs">
            <h2 className="text-sm font-semibold">Request a new vehicle</h2>
            <p className="text-[11px] text-slate-400">
              Submit details for a new car. An admin must approve your request before
              customers can see and rent it.
            </p>

            <form onSubmit={handleSubmit} className="mt-2 space-y-3">
              {message && (
                <p className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-[11px] text-slate-200">
                  {message}
                </p>
              )}

              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="block text-[11px] font-medium text-slate-200">
                    Your name (owner)
                  </span>
                  <input
                    name="ownerName"
                    defaultValue={ownerName}
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                    placeholder="Alex Motors"
                  />
                </label>
                <label className="space-y-1">
                  <span className="block text-[11px] font-medium text-slate-200">
                    Vehicle name
                  </span>
                  <input
                    name="name"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                    placeholder="EcoDrive Compact"
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="block text-[11px] font-medium text-slate-200">
                    Brand
                  </span>
                  <input
                    name="brand"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                    placeholder="EcoDrive"
                  />
                </label>
                <label className="space-y-1">
                  <span className="block text-[11px] font-medium text-slate-200">
                    Plate number
                  </span>
                  <input
                    name="plate"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                    placeholder="PLT-1023"
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="block text-[11px] font-medium text-slate-200">
                    Daily price (PHP)
                  </span>
                  <input
                    name="price"
                    type="number"
                    min={0}
                    step="0.01"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                    placeholder="1000"
                  />
                </label>
                <label className="space-y-1">
                  <span className="block text-[11px] font-medium text-slate-200">
                    Current location
                  </span>
                  <input
                    name="location"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/60"
                    placeholder="Downtown Hub"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-[11px] font-medium text-white shadow-sm hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending request…" : "Send request to admin"}
              </button>
            </form>

            <div className="mt-4 space-y-2">
              <h3 className="text-xs font-semibold text-slate-200">
                Pending requests {ownerName && `for ${ownerName}`}
              </h3>
              {myRequests.length === 0 ? (
                <p className="text-[11px] text-slate-400">
                  You don&apos;t have any pending requests right now.
                </p>
              ) : (
                <div className="space-y-2 text-[11px]">
                  {myRequests.map((request) => (
                    <div
                      key={request.id}
                      className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {request.name} · {request.plate}
                        </p>
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                          Waiting for admin
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Location: {request.location} · Daily rate: ₱
                        {request.price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

