const productBrandService = require('../services/productBrandService');

exports.createNewProductBrand = async (req, res) => {
    const { name } = req.body;

    if (!name)
        return res.status(400).json({
            success: false,
            message: 'Lütfen bütün alanları doldurunuz.'
        });

    try {
        if (await productBrandService.getProductBrandByName(name)) {
            return res.status(409).json({
                success: false,
                message: 'Bu isimle zaten bir ürün markası kayıtlı.'
            });
        }

        const newProductBrand = await productBrandService.createProductBrand({
            name,
            createdUserId: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: `${name} isimli ürün markası kayıt oldu.`,
            data: newProductBrand
        });

    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${name} isimli ürün markası eklenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllProductBrands = async (req, res) => {
    try {
        const getProductBrands = await productBrandService.getAllProductBrands();
        return res.status(200).json({
            success: true,
            message: `Sistemde kayıtlı bütün ürün markaları listelendi.`,
            data: getProductBrands
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `Ürün markaları listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getProductBrandById = async (req, res) => {
    const productBrandId = req.params.brand_id;

    try {
        const getProductBrand = await productBrandService.getProductBrandById(productBrandId);
        return res.status(200).json({
            success: true,
            message: `${getProductBrand.name} isimli ürün markasının bilgileri listelendi`,
            data: getProductBrand
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productBrandId} kimlik id'sine sahip ürün markası listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.updateProductBrandById = async (req, res) => {
    const productBrandId = req.params.brand_id;
    const { name } = req.body;

    if (!name)
        return res.status(400).json({
            success: false,
            message: 'Güncellenicek geçerli alan bulunamadı.'
        });

    try {
        const checkProductBrandName = await productBrandService.getProductBrandByName(name);

        if (checkProductBrandName && checkProductBrandName._id != productBrandId) {
            return res.status(409).json({
                success: false,
                message: 'Bu isimle zaten bir ürün markası kayıtlı.'
            });
        }

        const updatedProductBrand = await productBrandService.updateProductBrandById(productBrandId, { '$set': { name, 'lastUpdatedUserId': req.user._id } });

        return res.status(200).json({
            success: false,
            message: `${updatedProductBrand.name} isimli ürün markasının kaydı güncellendi.`,
            data: updatedProductBrand
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productBrandId} kimlik id'sine sahip ürün markası güncellenirken şu hata meydana geldi : -  ${error}`
        });
    }

}

exports.deleteProductBrandById = async (req, res) => {
    const productBrandId = req.params.brand_id;
    try {
        const deletedProductBrand = await productBrandService.deleteProductBrandById(productBrandId);
        res.status(200).json({
            status: 200,
            message: `${deletedProductBrand.name} ürün markasının kaydı kalıcı olarak silindi.`
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productBrandId} kimlik id'sine sahip ürün markası silinirken şu hata meydana geldi : -  ${error}`
        });
    }
}