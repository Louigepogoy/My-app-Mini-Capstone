/**
 * Shared in-memory store for demo. Replace with a real DB in production.
 * IMPORTANT: All API routes import this so data is shared across Customer, Owner, and Admin.
 */

let userIdCounter = 1;
let vehicleIdCounter = 1;
let bookingIdCounter = 1;
let reviewIdCounter = 1;

export const users = [];
export const vehicles = [];
export const bookings = [];
export const reviews = [];

export function createUser({ email, password, role, profile = {} }) {
  const id = userIdCounter++;
  const user = { id, email, password, role, profile, verified: role !== 'owner', suspended: false };
  users.push(user);
  return { id, email, role, verified: user.verified, suspended: user.suspended };
}

export function findUserByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id) {
  return users.find((u) => u.id === Number(id));
}

export function createVehicle({ ownerId, name, model, plate, pricePerDay, availability = true }) {
  const id = vehicleIdCounter++;
  const vehicle = { id, ownerId, name, model, plate, pricePerDay, availability };
  vehicles.push(vehicle);
  return vehicle;
}

export function findVehicleById(id) {
  return vehicles.find((v) => v.id === Number(id));
}

export function createBooking({ vehicleId, customerId, ownerId, status = 'pending', totalAmount }) {
  const id = bookingIdCounter++;
  const booking = { id, vehicleId, customerId, ownerId, status, totalAmount, paid: false };
  bookings.push(booking);
  return booking;
}

export function findBookingById(id) {
  return bookings.find((b) => b.id === Number(id));
}

export function createReview({ bookingId, customerId, vehicleId, rating, comment }) {
  const id = reviewIdCounter++;
  const review = { id, bookingId, customerId, vehicleId, rating, comment };
  reviews.push(review);
  return review;
}

export function updateVehicle(id, data) {
  const v = vehicles.find((x) => x.id === Number(id));
  if (!v) return null;
  Object.assign(v, data);
  return v;
}

export function deleteVehicle(id) {
  const i = vehicles.findIndex((x) => x.id === Number(id));
  if (i === -1) return false;
  vehicles.splice(i, 1);
  return true;
}

export function updateBooking(id, data) {
  const b = bookings.find((x) => x.id === Number(id));
  if (!b) return null;
  Object.assign(b, data);
  return b;
}

export function verifyUser(id) {
  const u = users.find((x) => x.id === Number(id));
  if (!u) return null;
  u.verified = true;
  return u;
}

export function suspendUser(id) {
  const u = users.find((x) => x.id === Number(id));
  if (!u) return null;
  u.suspended = true;
  return u;
}

export function unsuspendUser(id) {
  const u = users.find((x) => x.id === Number(id));
  if (!u) return null;
  u.suspended = false;
  return u;
}

// Seed demo users so login works for admin and owner (no signup for admin).
// Only runs in Node (API routes); avoids running in browser if store is ever imported on client.
if (typeof process !== 'undefined' && process.env && users.length === 0) {
  createUser({ email: 'admin@rental.com', password: 'admin123', role: 'admin' });
  createUser({ email: 'owner@rental.com', password: 'owner123', role: 'owner' });
}
