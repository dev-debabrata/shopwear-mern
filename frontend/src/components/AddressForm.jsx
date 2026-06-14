import Input from "./Input";
import { cn } from "../utils/cn";
import { deliveryFields } from "../data/checkoutData";

const AddressForm = ({ formData, setFormData }) => {
    return (
        <div className="flex gap-3 w-full flex-wrap">
            {deliveryFields.map((deliveryField) => (
                <Input
                    key={deliveryField.fieldName}
                    value={formData[deliveryField.fieldName]}
                    size="medium"
                    htmlType="text"
                    required={deliveryField.isRequired}
                    inputClassName="w-full px-4 border-gray-300 rounded mb-1"
                    wrapperClassName={cn({
                        "w-full": deliveryField.isFullWidth,
                        "w-[calc(50%-0.375rem)]": !deliveryField.isFullWidth,
                    })}
                    placeholder={deliveryField.placeholder}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            [deliveryField.fieldName]: e.target.value,
                        })
                    }
                />
            ))}
        </div>
    );
};

export default AddressForm;