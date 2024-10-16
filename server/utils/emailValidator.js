import axios from "axios"

const validateEmail = async (email) => {
    try {
        const response = await axios.get('https://emailvalidation.abstractapi.com/v1/?api_key=' +  process.env.EMAIL_VALIDATION_API_KEY + '&email=' + email)

        return response.data.deliverability === "DELIVERABLE" && response.data.is_valid_format.value && response.data.is_free_email.value && !response.data.is_disposable_email.value &&  response.data.is_smtp_valid.value
    } catch (err) {
        console.log(err);
        return false
    }
}

export { validateEmail }