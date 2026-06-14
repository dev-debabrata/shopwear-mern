import AddressForm from "./AddressForm";
import Button from "./Button";

const emptyAddress = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    mobile: "",
};

const AddressModal = ({
    formData,
    setFormData,
    onClose,
    onSave,
    editingIndex,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-3 text-2xl text-gray-500 hover:text-black cursor-pointer"
                >
                    ×
                </button>

                <h2 className="mb-5 text-xl font-semibold">
                    {editingIndex ? "Edit Address" : "Add Address"}
                </h2>

                <form onSubmit={onSave}>
                    <AddressForm formData={formData} setFormData={setFormData} />

                    <div className="mt-5 flex justify-end gap-3">
                        <Button
                            type="transparent"
                            size="small"
                            onClick={onClose}
                            buttonType="button"
                        >
                            Cancel
                        </Button>

                        <Button buttonType="submit" type="primary" size="small">
                            {editingIndex ? "Update Address" : "Save Address"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { emptyAddress };
export default AddressModal;