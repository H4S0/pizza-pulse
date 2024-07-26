import { useState } from "react";

export default function AddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
  onSave,
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Phone</label>
        <input
          disabled={disabled}
          type="tel"
          placeholder="Phone number"
          value={phone || ""}
          onChange={(ev) => setAddressProp("phone", ev.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Street Address
        </label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Street address"
          value={streetAddress || ""}
          onChange={(ev) => setAddressProp("streetAddress", ev.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Postal Code
          </label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal code"
            value={postalCode || ""}
            onChange={(ev) => setAddressProp("postalCode", ev.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city || ""}
            onChange={(ev) => setAddressProp("city", ev.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Country
        </label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Country"
          value={country || ""}
          onChange={(ev) => setAddressProp("country", ev.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#973131] disabled:bg-gray-200"
        />
      </div>
    </div>
  );
}
