const customerService = require('../services/customerService');

exports.createNewCustomer = async (req, res) => {
    const { name, surname, phone, email } = req.body;

    if (!name || !surname || !phone || !email)
        return res.status(400).json({
            success: false,
            message: 'Lütfen bütün alanları doldurunuz.'
        });

    try {
        if (await customerService.getCustomerByEmail(email)) {
            return res.status(409).json({
                success: false,
                message: 'Bu e-posta adresiyle zaten bir müşteri kayıtlı.'
            });
        }

        if (await customerService.getCustomerByPhone(phone)) {
            return res.status(409).json({
                success: false,
                message: 'Bu telefon numarası ile zaten bir müşteri kayıtlı.'
            });
        }

        const newCustomer = await customerService.createCustomer({
            name,
            surname,
            phone,
            email: email.toLowerCase(),
            createdUserId: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: `${name} ${surname} müşterisi kayıt oldu.`,
            data: newCustomer
        });

    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${name} ${surname} müşterisi eklenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllCustomers = async (req, res) => {
    try {
        const getCustomers = await customerService.getAllCustomers();
        return res.status(200).json({
            success: true,
            message: `Sistemde kayıtlı bütün müşteriler listelendi.`,
            data: getCustomers
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `Müşteriler listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getCustomerById = async (req, res) => {
    const customerId = req.params.customer_id;

    try {
        const getCustomer = await customerService.getCustomerById(customerId);
        return res.status(200).json({
            success: true,
            message: `${getCustomer.name} ${getCustomer.surname} müşterisinin bilgileri listelendi`,
            data: getCustomer
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${customerId} kimlik id'sine sahip müşteri listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.updateCustomerById = async (req, res) => {
    const customerId = req.params.customer_id;
    const { name, surname, phone, email } = req.body;

    if (!name && !surname && !phone && !email)
        return res.status(400).json({
            success: false,
            message: 'Güncellenicek geçerli alan bulunamadı.'
        });

    try {
        const checkEmailCustomer = await customerService.getCustomerByEmail(email);
        const checkPhoneCustomer = await customerService.getCustomerByPhone(phone);

        if (checkEmailCustomer && checkEmailCustomer._id != customerId) {
            return res.status(409).json({
                success: false,
                message: 'Bu e-posta adresiyle zaten bir müşteri kayıtlı.'
            });
        }

        if (checkPhoneCustomer && checkPhoneCustomer._id != customerId) {
            return res.status(409).json({
                success: false,
                message: 'Bu telefon numarası ile zaten bir müşteri kayıtlı.'
            });
        }

        const updatedCustomer = await customerService.updateCustomerById(customerId, { '$set': { name, surname, phone, email, 'lastUpdatedUserId': req.user._id, 'updatedAt': Date.now() } });

        return res.status(200).json({
            success: false,
            message: `${updatedCustomer.name} ${updatedCustomer.surname} müşterisinin kaydı güncellendi.`,
            data: updatedCustomer
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${customerId} kimlik id'sine sahip müşteri güncellenirken şu hata meydana geldi : -  ${error}`
        });
    }

}

exports.deleteCustomerById = async (req, res) => {
    const customerId = req.params.customer_id;
    try {
        const deletedCustomer = await customerService.deleteCustomerById(customerId);
        res.status(200).json({
            status: 200,
            message: `${deletedCustomer.name} ${deletedCustomer.surname} müşterisinin kaydı kalıcı olarak silindi.`
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${customerId} kimlik id'sine sahip müşteri silinirken şu hata meydana geldi : -  ${error}`
        });
    }
}