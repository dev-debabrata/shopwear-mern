import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AddressModal, { emptyAddress } from "./AddressModel";
import Button from "./Button";
import {
    getMyAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
} from "../services/addressService";

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [formData, setFormData] = useState(emptyAddress);

    const fetchAddresses = async () => {
        try {
            const data = await getMyAddresses();
            setAddresses(data.addresses || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const closeModal = () => {
        setShowAddressForm(false);
        setEditingAddressId(null);
        setFormData(emptyAddress);
    };

    const handleSaveAddress = async (e) => {
        e.preventDefault();

        try {
            if (editingAddressId) {
                const data = await updateAddress(editingAddressId, formData);

                setAddresses((prev) =>
                    prev.map((address) =>
                        address._id === editingAddressId ? data.address : address
                    )
                );

                toast.success("Address updated successfully");
            } else {
                const data = await createAddress(formData);
                setAddresses((prev) => [data.address, ...prev]);

                toast.success("Address saved successfully");
            }

            closeModal();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Address save failed");
        }
    };

    const handleEditAddress = (address) => {
        setFormData({
            firstName: address.firstName || "",
            lastName: address.lastName || "",
            emailAddress: address.emailAddress || "",
            street: address.street || "",
            city: address.city || "",
            state: address.state || "",
            zipCode: address.zipCode || "",
            country: address.country || "",
            mobile: address.mobile || "",
        });

        setEditingAddressId(address._id);
        setShowAddressForm(true);
    };

    const handleDeleteAddress = async (id) => {
        try {
            await deleteAddress(id);
            setAddresses((prev) => prev.filter((address) => address._id !== id));
            toast.success("Address deleted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Address delete failed");
        }
    };

    return (
        <>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Address</h3>

                    <Button
                        onClick={() => setShowAddressForm(true)}
                        type="primary"
                        size="small"
                        className="rounded px-4"
                    >
                        Add Address
                    </Button>
                </div>

                {addresses.length === 0 ? (
                    <p className="text-sm text-gray-500">No address added.</p>
                ) : (
                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <div
                                key={address._id}
                                className="p-4 border border-gray-200 rounded-md"
                            >
                                <p className="font-medium">
                                    {address.firstName} {address.lastName}
                                </p>

                                <p className="text-sm text-gray-600">
                                    {address.emailAddress}
                                </p>
                                <p className="text-sm text-gray-600">{address.mobile}</p>

                                <p className="text-sm text-gray-600">
                                    {address.street}, {address.city}, {address.state},{" "}
                                    {address.country} - {address.zipCode}
                                </p>

                                <div className="flex gap-3 mt-3">
                                    <button
                                        onClick={() => handleEditAddress(address)}
                                        className="text-sm text-blue-600 cursor-pointer"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDeleteAddress(address._id)}
                                        className="text-sm text-red-600 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showAddressForm && (
                <AddressModal
                    formData={formData}
                    setFormData={setFormData}
                    onClose={closeModal}
                    onSave={handleSaveAddress}
                    editingIndex={editingAddressId}
                />
            )}
        </>
    );
};

export default Address;