"use client";

import { useEffect, useRef, useState } from "react";

type Vehicle = {
  id: string;
  name: string;
  brand: string;
  owner: string;
  plate: string;
  price: number;
  location: string;
  description?: string;
  imageUrl?: string;
  status: "available" | "rented";
};

export default function AdminAddVehiclePage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleImageFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = window.localStorage.getItem("role");
      setIsAdmin(role === "admin");
    }
  }, []);

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-50">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center shadow-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            Admin only
          </p>
          <h1 className="mt-2 text-lg font-semibold">Access restricted</h1>
          <p className="mt-1 text-xs text-slate-400">
            Only admin users can add vehicles. Log in with an admin account to
            continue.
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const vehicle: Vehicle = {
      id: Date.now().toString(),
      name: (formData.get("name") as string) || "",
      brand: (formData.get("brand") as string) || "",
      owner: (formData.get("owner") as string) || "",
      plate: (formData.get("plate") as string) || "",
      price: Number(formData.get("price") || 0),
      location: (formData.get("location") as string) || "",
      description: (formData.get("description") as string) || "",
      imageUrl: (formData.get("imageUrl") as string) || "",
      status: "available",
    };

    try {
      setIsSaving(true);

      if (typeof window !== "undefined") {
        const existingRaw = window.localStorage.getItem("vehicles");
        const existing: Vehicle[] = existingRaw ? JSON.parse(existingRaw) : [];

        const updated = [...existing, vehicle];
        window.localStorage.setItem("vehicles", JSON.stringify(updated));
      }

      form.reset();
      setMessage("Vehicle saved. Customers can now see and rent it from their dashboard.");
    } catch (error) {
      console.error("Failed to save vehicle", error);
      setMessage("Something went wrong while saving the vehicle. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="border-b border-slate-800 pb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            Admin · Add vehicle
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Register a new vehicle</h1>
          <p className="mt-1 text-xs text-slate-400">
            Capture basic details so the vehicle can appear in Available
            vehicles and owner dashboards.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg text-xs"
        >
          {message && (
            <p className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-[11px] text-slate-200">
              {message}
            </p>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Vehicle name
              </span>
              <input
                name="name"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60"
                placeholder="EcoDrive Compact"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Brand
              </span>
              <input
                name="brand"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60"
                placeholder="EcoDrive"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Owner name
              </span>
              <input
                name="owner"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60"
                placeholder="Alex Motors"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Plate number
              </span>
              <input
                name="plate"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60"
                placeholder="PLT-1023"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Daily price (USD)
              </span>
              <input
                name="price"
                type="number"
                min={0}
                step="0.01"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60"
                placeholder="42.00"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Current location
              </span>
              <input
                name="location"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60"
                placeholder="Downtown Hub"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 md:col-span-2">
              <span className="block text-[11px] font-medium text-slate-200">
                Short description
              </span>
              <textarea
                name="description"
                rows={3}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60"
                placeholder="E.g. Fuel-efficient compact ideal for city commutes and weekend trips."
              />
            </label>
            <label className="space-y-1">
              <span className="block text-[11px] font-medium text-slate-200">
                Image URL
              </span>
              <div className="flex items-center gap-3">
                <input type="hidden" name="imageUrl" value={imagePreviewUrl} />
                <input
                  type="url"
                  onChange={(event) => setImagePreviewUrl(event.target.value)}
                  className="w-full flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-50 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/60"
                  placeholder="https://example.com/vehicle-photo.jpg"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageFileChange}
                />
                <div
                  className="hidden h-16 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-slate-800/70 bg-slate-900 text-[9px] text-slate-500 md:flex"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "Preview"
                  )}
                </div>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-fuchsia-500 px-5 py-2 text-xs font-medium text-white shadow-sm hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
}

