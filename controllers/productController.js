const productService = require('../services/productService');

exports.createNewProduct = async (req, res) => {
    const { name, typeId, brandId } = req.body;

    if (!name || !typeId || !brandId)
        return res.status(400).json({
            success: false,
            message: 'Lütfen bütün alanları doldurunuz.'
        });

    try {
        if (await productService.getProductByName(name)) {
            return res.status(409).json({
                success: false,
                message: 'Bu isimle zaten bir ürün kayıtlı.'
            });
        }

        const newProduct = await productService.createProduct({
            name,
            typeId,
            brandId,
            createdUserId: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: `${name} isimli ürün kayıt oldu.`,
            data: newProduct
        });

    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${name} isimli ürün eklenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const getProducts = await productService.getAllProducts();
        return res.status(200).json({
            success: true,
            message: `Sistemde kayıtlı bütün ürünler listelendi.`,
            data: getProducts
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `Ürünler listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getProductById = async (req, res) => {
    const productId = req.params.product_id;

    try {
        const getProduct = await productService.getProductById(productId);
        return res.status(200).json({
            success: true,
            message: `${getProduct.name} isimli ürün bilgileri listelendi`,
            data: getProduct
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productId} kimlik id'sine sahip ürün listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllProductsByTypeId = async (req, res) => {
    const typeId = req.params.type_id;

    try {
        const getProducts = await productService.getAllProductsByTypeId(typeId);
        return res.status(200).json({
            success: true,
            message: `Sistemdeki belirtilen türe kayıtlı bütün ürünler listelendi.`,
            data: getProducts
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${typeId} tür kimlik id'sine sahip ürünler listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllProductsByBrandId = async (req, res) => {
    const brandId = req.params.brand_id;

    try {
        const getProducts = await productService.getAllProductsByBrandId(brandId);
        return res.status(200).json({
            success: true,
            message: `Sistemdeki belirtilen markaya kayıtlı bütün ürünler listelendi.`,
            data: getProducts
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${brandId} marka kimlik id'sine sahip ürünler listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.getAllProductsByTypeAndBrandId = async (req, res) => {
    const typeId = req.params.type_id;
    const brandId = req.params.brand_id;

    try {
        const getProducts = await productService.getAllProductsByTypeAndBrandId(typeId, brandId);
        return res.status(200).json({
            success: true,
            message: `Sistemdeki belirtilen türe ve markaya kayıtlı bütün ürünler listelendi.`,
            data: getProducts
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${typeId} tür ve ${brandId} marka kimlik id'lerine sahip ürün listelenirken şu hata meydana geldi : -  ${error}`
        });
    }
}

exports.updateProductById = async (req, res) => {
    const productId = req.params.product_id;
    const { name, typeId, brandId } = req.body;

    if (!name && !typeId && !brandId)
        return res.status(400).json({
            success: false,
            message: 'Güncellenicek geçerli alan bulunamadı.'
        });

    try {
        const checkProductName = await productService.getProductByName(name);

        if (checkProductName && checkProductName._id != productId) {
            return res.status(409).json({
                success: false,
                message: 'Bu isimle zaten bir ürün kayıtlı.'
            });
        }

        const updatedProduct = await productService.updateProductById(productId, { '$set': { name, typeId, brandId, 'lastUpdatedUserId': req.user._id } });

        return res.status(200).json({
            success: false,
            message: `${updatedProduct.name} isimli ürün kaydı güncellendi.`,
            data: updatedProduct
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productId} kimlik id'sine sahip ürün güncellenirken şu hata meydana geldi : -  ${error}`
        });
    }

}

exports.deleteProductById = async (req, res) => {
    const productId = req.params.product_id;
    try {
        const deletedProduct = await productService.deleteProductById(productId);
        res.status(200).json({
            status: 200,
            message: `${deletedProduct.name} ürün kaydı kalıcı olarak silindi.`
        });
    } catch (error) {
        res.status(422).json({
            success: false,
            message: `${productId} kimlik id'sine sahip ürün silinirken şu hata meydana geldi : -  ${error}`
        });
    }
}