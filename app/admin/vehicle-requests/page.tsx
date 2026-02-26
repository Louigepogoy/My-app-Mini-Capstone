 "use client";

import { useEffect, useState } from "react";

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

export default function AdminVehicleRequestsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState<VehicleRequest[]>([]);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const role = window.localStorage.getItem("role");
    setIsAdmin(role === "admin");

    const requestsRaw = window.localStorage.getItem("vehicleRequests");
    const storedRequests: VehicleRequest[] = requestsRaw ? JSON.parse(requestsRaw) : [];
    setRequests(storedRequests.filter((r) => r.status === "pending"));
  }, []);

  function updateStorage(updatedRequests: VehicleRequest[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("vehicleRequests", JSON.stringify(updatedRequests));
  }

  function handleApprove(requestId: string) {
    if (typeof window === "undefined") return;

    setIsProcessing(requestId);

    try {
      const currentRequests = [...requests];
      const request = currentRequests.find((r) => r.id === requestId);
      if (!request) return;

      const vehicle: Vehicle = {
        id: Date.now().toString(),
        name: request.name,
        brand: request.brand,
        owner: request.ownerName,
        plate: request.plate,
        price: request.price,
        location: request.location,
        status: "available",
      };

      const vehiclesRaw = window.localStorage.getItem("vehicles");
      const existingVehicles: Vehicle[] = vehiclesRaw ? JSON.parse(vehiclesRaw) : [];
      const updatedVehicles = [...existingVehicles, vehicle];
      window.localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));

      const remainingRequests = currentRequests.filter((r) => r.id !== requestId);
      setRequests(remainingRequests);
      updateStorage(remainingRequests);
    } finally {
      setIsProcessing(null);
    }
  }

  function handleReject(requestId: string) {
    if (typeof window === "undefined") return;

    setIsProcessing(requestId);

    try {
      const remainingRequests = requests.filter((r) => r.id !== requestId);
      setRequests(remainingRequests);
      updateStorage(remainingRequests);
    } finally {
      setIsProcessing(null);
    }
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-50">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center shadow-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            Admin only
          </p>
          <h1 className="mt-2 text-lg font-semibold">Access restricted</h1>
          <p className="mt-1 text-xs text-slate-400">
            Only admin users can review owner vehicle requests. Log in with an admin
            account to continue.
          </p>
          <a
            href="/login"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-800 px-4 py-2 text-xs font-medium text-slate-50 hover:bg-slate-700"
          >
            Go to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <header className="border-b border-slate-800 pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            Admin · Owner vehicle requests
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Review owner vehicles</h1>
          <p className="mt-1 text-xs text-slate-400">
            Approve or reject vehicles submitted by owners. Approved vehicles become
            available for customers to rent.
          </p>
        </header>

        <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg text-xs">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold">Pending requests</h2>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-slate-200">
              {requests.length} pending
            </span>
          </div>

          {requests.length === 0 ? (
            <p className="mt-2 text-[11px] text-slate-400">
              There are no pending owner vehicle requests right now.
            </p>
          ) : (
            <div className="mt-2 space-y-3">
              {requests.map((request) => (
                <article
                  key={request.id}
                  className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-50">
                        {request.name} · {request.plate}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Owner: <span className="text-slate-200">{request.ownerName}</span>
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                      Pending
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Brand: <span className="text-slate-200">{request.brand}</span> · Location:{" "}
                    <span className="text-slate-200">{request.location}</span>
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Daily rate:{" "}
                    <span className="font-semibold">
                      ₱
                      {request.price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </p>

                  <div className="mt-2 flex items-center justify-end gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => handleReject(request.id)}
                      disabled={isProcessing === request.id}
                      className="rounded-full border border-slate-700 px-3 py-1.5 text-slate-200 hover:border-rose-500 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(request.id)}
                      disabled={isProcessing === request.id}
                      className="rounded-full bg-emerald-500 px-3 py-1.5 font-medium text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isProcessing === request.id ? "Processing…" : "Approve & publish"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

