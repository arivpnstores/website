import axios from "axios";
import { randomUUID } from 'crypto';

let data = {
    transaction_details: {
        order_id: randomUUID(),
        gross_amount: 10000
    },
    currency: "IDR",
    usage_limit: 1,
    callback: {
        success: "https://rajaserverpremium.my.id/riquest_sg_vvip",
        failure: "https://rajaserverpremium.my.id/",
        pending: "https://rajaserverpremium.my.id/"
    },
};

export const createPaymentLink = async (data) => {
    try {
        const response = await axios.post("https://api.midtrans.com/v1/payment-links", data, {
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "Authorization": "Basic TWlkLXNlcnZlci1mZExKb2U2NkFnNnNBbGJ3OTVhTU5iam46TWlkLWNsaWVudC1QSTUtcHRaVFJZdk94TWJF"
            }
        });
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export const getPaymentStatus = async (id) => {
    try {
        const result = {};
        const response = await axios.get("https://api.midtrans.com/v2/" + id + "/status", {
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "Authorization": "Basic TWlkLXNlcnZlci1mZExKb2U2NkFnNnNBbGJ3OTVhTU5iam46TWlkLWNsaWVudC1QSTUtcHRaVFJZdk94TWJF"
            }
        });
        result.status = response.data.status_code;
        result.message = response.data.status_message;
        result.date = response.data.transaction_time;
        result.payment = response.data.payment_type;
        result.order_id = response.data.order_id;
        return result;
    } catch (e) {
        console.error(e);
    }
}

createPaymentLink(data);
