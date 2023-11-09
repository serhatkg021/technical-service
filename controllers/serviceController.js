const serviceService = require('../services/serviceService');

exports.createNewService = async (req, res) => {
    const { productId, customerId, comment } = req.body;

    if (!productId || !customerId)
        return res.status(400).json({
            success: false,
            message: 'Lütfen bütün alanları doldurunuz.'
        });

    try {
        let serviceCode = Math.floor(Math.random() * 9000000000) + 1000000000;
        while (await serviceService.getServiceByServiceCode(serviceCode)) {
            serviceCode = Math.floor(Math.random() * 9000000000) + 1000000000;
        }

        const newService = await serviceService.createService({
            serviceCode,
            productId,
            customerId,
            comment,
            createdUserId: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: `${serviceCode} kodlu servis kayıt oldu.`,
            data: newService
        });

    } catch (error) {
        res.status(422).json({
            success: false,
            message: `Servis eklenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllServices = async (req, res) => {
    try {
        const getServices = await serviceService.getAllServices();
        return res.status(200).json({
            success: true,
            message: `Sistemde kayıtlı bütün servisler listelendi.`,
            data: getServices
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `Servisler listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getServiceById = async (req, res) => {
    const serviceId = req.params.service_id;

    try {
        const getService = await serviceService.getServiceById(serviceId);
        return res.status(200).json({
            success: true,
            message: `${getService.serviceCode} kodlu servis bilgileri listelendi`,
            data: getService
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${serviceId} servis kimlik id'sine sahip servis listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllServicesByProductId = async (req, res) => {
    const productId = req.params.product_id;

    try {
        const getServices = await serviceService.getAllServicesByProductId(productId);
        return res.status(200).json({
            success: true,
            message: `Sistemdeki belirtilen ürüne kayıtlı bütün servisler listelendi.`,
            data: getServices
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productId} ürün kimlik id'sine sahip servisler listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllServicesByCustomerId = async (req, res) => {
    const customerId = req.params.customer_id;

    try {
        const getServices = await serviceService.getAllServicesByCustomerId(customerId);
        return res.status(200).json({
            success: true,
            message: `Sistemdeki belirtilen müşteriye kayıtlı bütün servisler listelendi.`,
            data: getServices
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${brandId} müşteri kimlik id'sine sahip servisler listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllServicesByProductAndCustomerId = async (req, res) => {
    const productId = req.params.product_id;
    const customerId = req.params.customer_id;

    try {
        const getServices = await serviceService.getAllServicesByProductAndCustomerId(productId, customerId);
        return res.status(200).json({
            success: true,
            message: `Sistemdeki belirtilen ürün ve müşteriye kayıtlı bütün servisler listelendi.`,
            data: getServices
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productId} ürün ve ${customerId} müşteri kimlik id'lerine sahip servisler listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.updateServiceById = async (req, res) => {
    const serviceId = req.params.service_id_id;
    const { productId, customerId, comment } = req.body;

    if (!productId && !customerId && !comment)
        return res.status(400).json({
            success: false,
            message: 'Güncellenicek geçerli alan bulunamadı.'
        });

    try {
        const updatedService = await serviceService.updateServiceById(serviceId, { '$set': { productId, customerId, comment, 'lastUpdatedUserId': req.user._id } });

        return res.status(200).json({
            success: false,
            message: `${updatedService.serviceCode} kodlu servis kaydı güncellendi.`,
            data: updatedService
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${serviceId} kimlik id'sine sahip servis güncellenirken şu hata meydana geldi : -  ${error}`
        });
    }

}

exports.deleteServiceById = async (req, res) => {
    const serviceId = req.params.service_id;
    try {
        const deletedService = await serviceService.deleteServiceById(serviceId);
        res.status(200).json({
            status: 200,
            message: `${deletedService.name} servis kaydı kalıcı olarak silindi.`
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${serviceId} kimlik id'sine sahip servis silinirken şu hata meydana geldi : -  ${error}`
        });
    }
}