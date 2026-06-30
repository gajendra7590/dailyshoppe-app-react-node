import { resultCode200, resultCode400, resultCode500, resultCode401 } from '../../utils/responseHandler.js';
import ContactUs from '../../models/ContactUs.js';
import { validationResult } from 'express-validator';
import NewsLetterSubscribe from '../../models/NewsLetterSubscribe.js';

export const submitContactUs = async (req, res) => {
    try {

        const createdData = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }

        const saveResult = ContactUs.create(createdData);
        if (!saveResult) {
            return resultCode400(res, 'Facing some issue, try again later')
        }
        return resultCode200(res, "Thank you for contacting us, we will get you in touch.");
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
}

export const submitSubscribeNewsLetter = async (req, res) => {
    try {

        const createdData = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resultCode400(res, "Validation failed", errors.array());
        }
        createdData.isActive = true;
        createdData.unSubscribedAt = null;
        const saveResult = await NewsLetterSubscribe.findOneAndUpdate(
            { email: createdData?.email }, { $set: createdData }, { new: true, upsert: true, runValidators: true }
        );
        console.log(saveResult)
        if (!saveResult) {
            return resultCode400(res, 'Facing some issue, try again later')
        }
        return resultCode200(res, "You have been successfully subscribe our new letters.");
    } catch (error) {
        console.log(error)
        return resultCode500(res, error);
    }
} 