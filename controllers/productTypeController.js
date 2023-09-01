const productTypeService = require('../services/productTypeService');

exports.createNewProductType = async (req, res) => {
    const { name } = req.body;

    if (!name)
        return res.status(400).json({
            success: false,
            message: 'Lütfen bütün alanları doldurunuz.'
        });

    try {
        if (await productTypeService.getProductTypeByName(name)) {
            return res.status(409).json({
                success: false,
                message: 'Bu isimle zaten bir ürün türü kayıtlı.'
            });
        }

        const newProductType = await productTypeService.createProductType({
            name,
            createdUserId: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: `${name} isimli ürün türü kayıt oldu.`,
            data: newProductType
        });

    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${name} isimli ürün türü eklenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllProductTypes = async (req, res) => {
    try {
        const getProductTypes = await productTypeService.getAllProductTypes();
        return res.status(200).json({
            success: true,
            message: `Sistemde kayıtlı bütün ürün türleri listelendi.`,
            data: getProductTypes
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `Ürün türleri listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getProductTypeById = async (req, res) => {
    const productTypeId = req.params.type_id;

    try {
        const getProductType = await productTypeService.getProductTypeById(productTypeId);
        return res.status(200).json({
            success: true,
            message: `${getProductType.name} isimli ürün türünün bilgileri listelendi`,
            data: getProductType
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productTypeId} kimlik id'sine sahip ürün türü listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.updateProductTypeById = async (req, res) => {
    const productTypeId = req.params.type_id;
    const { name } = req.body;

    if (!name)
        return res.status(400).json({
            success: false,
            message: 'Güncellenicek geçerli alan bulunamadı.'
        });

    try {
        const checkProductTypeName = await productTypeService.getProductTypeByName(name);

        if (checkProductTypeName && checkProductTypeName._id != productTypeId) {
            return res.status(409).json({
                success: false,
                message: 'Bu isimle zaten bir ürün türü kayıtlı.'
            });
        }

        const updatedProductType = await productTypeService.updateProductTypeById(productTypeId, { '$set': { name, 'lastUpdatedUserId': req.user._id } });

        return res.status(200).json({
            success: false,
            message: `${updatedProductType.name} isimli ürün türünün kaydı güncellendi.`,
            data: updatedProductType
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productTypeId} kimlik id'sine sahip ürün türü güncellenirken şu hata meydana geldi : -  ${error}`
        });
    }

}

exports.deleteProductTypeById = async (req, res) => {
    const productTypeId = req.params.type_id;
    try {
        const deletedProductType = await productTypeService.deleteProductTypeById(productTypeId);
        res.status(200).json({
            status: 200,
            message: `${deletedProductType.name} ürün türünün kaydı kalıcı olarak silindi.`
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productTypeId} kimlik id'sine sahip ürün türü silinirken şu hata meydana geldi : -  ${error}`
        });
    }
}